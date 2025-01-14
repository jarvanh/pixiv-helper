import React from "react";
import {Button} from "~/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "~/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {useSettings} from "~/hooks/use-settings";
import {clearToken, getToken} from "~/hooks/use-alist.ts";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {defaultSettings} from "~/types";

const formSchema = z.object({
    proxyUrl: z.string().url("请输入有效的URL").default("https://i.pixiv.re"),
    alistUrl: z.string().url("请输入有效的URL").default(""),
    alistUsername: z.string().min(1, "alist 账号不能为空"),
    alistPassword: z.string().min(1, "alist 密码不能为空"),
    alistStoragePath: z.string().min(1, "请输入存储目录路径"),
});

function App() {
    const {settings, loading, saveSettings} = useSettings();
    const [testing, setTesting] = React.useState(false);

    console.log("Settings:", settings);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...defaultSettings,
        },
    });

    // 当设置加载完成后更新表单
    React.useEffect(() => {
        if (!loading && settings) {
            form.reset({
                ...settings,
            });
        }
    }, [loading, settings, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await saveSettings(values);
            toast.success("设置已保存");
        } catch (error) {
            toast.error("保存失败，请重试");
        }
    }

    async function testAlistConnection() {
        const values = form.getValues();
        if (!values.alistUrl || !values.alistUsername || !values.alistPassword) {
            toast.error("请先填写 Alist 站点地址、账号和密码");
            return;
        }
        setTesting(true);
        try {
            await saveSettings(values);
            await clearToken();
            await getToken(values, true);
            toast.success("Alist 连接成功！");
        } catch (error: any) {
            toast.error(error.message || "Alist 连接失败，请检查配置");
        } finally {
            setTesting(false);
        }
    }

    if (loading) {
        return (
            <div className="w-[400px] h-[400px] flex items-center justify-center">
                <div className="animate-spin">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-[400px]">
            <Card className={"rounded-none"}>
                <CardHeader>
                    <CardTitle>设置</CardTitle>
                    <CardDescription>配置 Pixiv 下载助手的基本参数</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="proxyUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Pixiv 代理站</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://i.pixiv.re" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            用于访问 Pixiv 图片的代理站点(否则无法离线下载)
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="alistUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Alist 站点地址</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://alist.example.com" {...field} />
                                        </FormControl>
                                        <FormDescription>Alist 服务的访问地址</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="alistUsername"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Alist 账号</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入 alist 账号" {...field} />
                                        </FormControl>
                                        <FormDescription>用于登录 alist 的用户名</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="alistPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Alist 密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="请输入 alist 密码"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>用于登录 alist 的密码</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="alistStoragePath"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>存储目录</FormLabel>
                                        <FormControl>
                                            <Input placeholder="/pixiv" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            指定在 alist 中存储图片的目录路径
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={testAlistConnection}
                                    disabled={testing}
                                >
                                    {testing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            测试中...
                                        </>
                                    ) : (
                                        "测试连接"
                                    )}
                                </Button>
                                <Button type="submit" className="flex-1">
                                    保存设置
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>
    );
}

export default App;
