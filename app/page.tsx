import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import img1 from "../public/image1.png"
import img2 from "../public/img2.png"
import savetime from "../public/savetime.png"
import quality from "../public/quality.png"
import ai from "../public/ai.png"
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Footer from "./components/Footer";


export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect('/dashboard')
  }
  return (
    <>
      <section className="flex items-center justify-center bg-background h-[90vh]">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="w-auto px-6 py-3 rounded-full bg-secondary">
                <span className="text-sm font-medium text-primary">
                  Convert Youtube Videos into Articles
                </span>
              </span>
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                Youtube Videos into Articles Instantly
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                Are yuo tired of spending endless hours transcribing Youtube videos manually? Do you wish there was an easy way to turn video content into engaging articles? Look no further - ScriptSnatch is here to revolutionize your content creation process.
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-10">
              <RegisterLink>
                <Button size="lg" className="w-full">
                  Sign Up to Get Started
                </Button>
              </RegisterLink>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-background h-[90vh]">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12  mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-6xl">
                What is Script<span className="text-primary">Snatch</span>?
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                Script Snatch is a cutting-edge tool designed to seamlessly transform YouTube videos into captivating articles. Whether you're a content creator, marketer, educator, or simply someone who loves to share knowledge, our platform simplifies the conversion process, saving you time and effort.
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-10">
              <Image src={img1} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-background h-[90vh] mt-20">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-auto md:px-12">
          <div className="max-w-3xl lg:max-w-max lg:justify-center lg:items-center lg:flex gap-x-40 mx-auto text-center lg:text-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-6xl">
                How Does it Work?
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                <span className="font-bold">Upload Your Video:</span> Simply paste the link to your desired YouTube video into Script Snatch.
              </p>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                <span className="font-bold">Article Generation:</span> Sit back and relax as ScriptSnatch transforms the transcription into a well-structured, SEO-friendly article tailored to your specifications.
              </p>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                <span className="font-bold">Edit and Customize:</span> Fine-tune the generated article to perfection, adding your personal touch or specific keywords to optimize for search engines.
              </p>
            </div>
            <div className="flex justify-center md:pl-20 max-w-sm mx-auto mt-10">
              <Image src={img2} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-background h-[90vh] mt-60">
        <div className="relative items-center w-[400px] md:w-full px-5 py-12 mt-60 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className=" mx-auto text-center mt-60">
            <div>
              <h1 className="text-3xl pt-40 font-extrabold tracking-tight lg:text-6xl">
                Why Choose Script<span className="text-primary">Snatch</span>?
              </h1>
            </div>
            <div className="flex flex-col gap-5 md:flex-row justify-center mx-auto mt-20">
              <Card className="py-10 px-10 mx-10 flex flex-col items-center justify-center">
                <Image src={savetime} width={100} height={100} alt="" />
                <CardTitle className="py-5">
                  Save Time
                </CardTitle>
                <CardDescription>
                  Say goodbye to tedious transcriptions! With Script Snatch, you can generate high-quality articles in minutes, freeing up valuable time for other tasks.
                </CardDescription>
              </Card>
              <Card className="py-10 px-10 mx-10 10 flex flex-col items-center justify-center">
                <Image src={quality} width={100} height={100} alt="" />
                <CardTitle className="py-5">
                  Quality Content
                </CardTitle>
                <CardDescription>
                  Our articles are crafted to perfection, preserving the essence of the original video while enhancing readability and engagement.
                </CardDescription>
              </Card>
              <Card className="py-10 px-10 mx-10 flex flex-col items-center justify-center">
                <Image src={ai} width={100} height={100} alt="" />
                <CardTitle className="py-5">
                  AI-Powered, Human Touch
                </CardTitle>
                <CardDescription>
                While our tool utilizes updated AI technology, the final output feels completely human, passing the scrutiny of AI detector tools effortlessly.
                </CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center mt-40 justify-center bg-background h-[150vh]">
        <div className="relative items-center mt-40 w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto mt-40 text-center">
            <div>
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                Ready to Elevate Your Content Creation Game?
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                Don't let valuable video content go to waste. Transform it into compelling articles with Script Snatch. Sign up now and Say goodbye to tedious transcriptions and hello to effortless article generation.
              </p>
            </div>
            <div className="flex justify-center max-w-sm mx-auto mt-10">
              <RegisterLink>
                <Button size="lg" className="w-full">
                  Start Creating!
                </Button>
              </RegisterLink>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}
