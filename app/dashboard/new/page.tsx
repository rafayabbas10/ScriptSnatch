"use client";
import { postData } from "@/app/components/CreateArticle";
import { Generate } from "@/app/components/Submitbuttons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";




export default function NewArticleRoute() {
    noStore();
    const [Url, setUrl] = useState("")
    const [Article, setArticle] = useState("")
    const [Title, setTitle] = useState("")

    const GetArticle = async () => {

        if (!Url) {
            setArticle("Invalid URL");
        } else {
            
            const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
            const match = Url.match(youtubeRegex);
            const id = match ? match[1] : null;
            try {
                const FetchArticle = await fetch(`https://fastapi-project-x7v5.onrender.com/api/v1/id/${id}`)
                const ArticleData = await FetchArticle.json();
                const article = ArticleData.text
                const work = await postData(Title, article)
                if (work === true){
                    setArticle(article)
                } else {
                    setArticle('Your have reached the maximum articles limit. Please buy subscription to continue.')
                }
            } catch (err) {
                setArticle('Either the video is too long or the transcript for the video is not available. Please try a different video.')
                

            }
            
        }
    }
    const revalidateHome = () => {
        revalidatePath('/', 'layout')
    }

    return (


        <Card>
            <form action={GetArticle}>

                <CardHeader>
                    <CardTitle>New Article</CardTitle>
                    <CardDescription>You can convert Youtube Video into article here.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>Title</Label>
                        <Input required type="text" name="title" placeholder="Title for your article" onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div className="gap-y-2 flex flex-col">
                        <Label>Youtube Link</Label>
                        <Input required type="text" name="ytlink" placeholder="Enter Youtube link" onChange={(e) => { setUrl(e.target.value) }} />
                    </div>
                    <div className="gap-y-2 flex flex-col" >
                        <Generate />
                    </div>
                    <div className="gap-y-2 flex flex-col">
                        <Label>Generated Article</Label>
                        <Textarea className="h-[300px]" name="description" placeholder="Your Article will be generated here." value={Article} readOnly />
                    </div>

                </CardContent>
                <CardFooter className="flex gap-3">
                    <Button asChild variant="secondary">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard" onClick={revalidateHome}>Save</Link>
                    </Button>

                </CardFooter>
            </form>
        </Card>
    )
}