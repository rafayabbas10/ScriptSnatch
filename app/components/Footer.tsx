import Link from "next/link";

export default function Footer() {
    return(
        <footer className="border-t-2 border-red-600 h-[5vh] mt-40 ">
        <div className="container flex flex-col items-center justify-between text-sm pt-5 pb-5 font-extrabold tracking-tight lg:text-3xl">
          <Link href="/">
            <h1 className="font-bold">Script<span className="text-primary">Snatch</span></h1>
          </Link>
          <div>
            <p className="font-light text-sm pt-1">© 2024 ScriptSnatch Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}