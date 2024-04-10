import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";


async function getData({userId, articleId}:{
    userId: string;
    articleId: string
}) {
    noStore();
    const data = await prisma.article.findUnique({
        where: {
            id: articleId,
            userId: userId
        },
        select: {
            title: true,
            description: true,
            id:true
        }
    })

    return data;
}

export default async function DynamicRoute({params}: {params: {id: string}}) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const data = await getData({userId: user?.id as string, articleId: params.id})
    return (

        <Card>
            <form >
                <CardHeader>
                    <CardTitle>View Article</CardTitle>
                    <CardDescription>You can view Youtube Video Article here.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>Title</Label>
                        <Input required type="text" name="title" placeholder="Title for your article" defaultValue={data?.title}/>
                    </div>
                    <div className="gap-y-2 flex flex-col">
                        <Label>Youtube Link</Label>
                        <Input required type="text" name="ytlink"  placeholder="Enter Youtube link" disabled/>
                    </div>
                    <div className="gap-y-2 flex flex-col">
                                <Button disabled>
                                    Generate
                                </Button>
                    </div>
                    <div className="gap-y-2 flex flex-col">
                        <Label>Generated Article</Label>
                        <Textarea className="h-[300px]" name="description"  placeholder="Your Article will be generated here." defaultValue={data?.description}/>
                    </div>

                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button asChild variant="secondary">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">Save</Link>
                    </Button>

                </CardFooter>
            </form>
        </Card>
    )
}