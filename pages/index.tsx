import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [websiteUrl, setWebsiteUrl] = useState<string>("");

  useEffect(() => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    setWebsiteUrl(baseUrl);
  }, []);
  const submitHandler = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/createurl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: originalUrl }),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      console.log(data);
      setShortUrl(data.url.shortUrl);
      setErrorMessage("");
    } catch (error: any) {
      setShortUrl("");

      setErrorMessage("Unknown error occurred");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(websiteUrl + "/" + shortUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          URL Shortener
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="originalUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Original URL
              </label>
              <div className="inline-flex gap-4 items-center mt-1 w-full">
                <div className=" w-full">
                  <input
                    id="originalUrl"
                    name="originalUrl"
                    // type="url"
                    autoComplete="off"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={originalUrl}
                    onChange={(event) => setOriginalUrl(event.target.value)}
                  />
                </div>

                <div className=" text-sm ">
                  <button
                    type="submit"
                    className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Shorten
                  </button>
                </div>
              </div>
            </div>

            {shortUrl && (
              <>
                <div className="inline-flex gap-4 items-center justify-between">
                  <span className="font-medium text-indigo-600">
                    {websiteUrl + "/" + shortUrl}
                  </span>
                  <div className=" text-sm ">
                    <button
                      type="button"
                      className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleCopy}
                    >
                      copy
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  to view the number of clicks for your link visit:
                  <Link
                    href={websiteUrl + "/clicks/" + shortUrl}
                    className="text-blue-500 font-bold hover:text-blue-600 hover:underline"
                  >
                    {websiteUrl + "/clicks/" + shortUrl}
                  </Link>
                </div>
              </>
            )}

            {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );

  //   <div className="relative h-[100vh]">
  //   {/* <div className=" absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2"> */}
  //   <form
  //     className="absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2"
  //     onSubmit={submitHandler}
  //   >
  //     <input
  //       className="text-black"
  //       type="url"
  //       placeholder="enter the url"
  //       value={originalUrl}
  //       onChange={urlChangeHandler}
  //     />
  //     <input type="submit" />
  //   </form>
  // </div>

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
  //       <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
  //         Get started by editing&nbsp;
  //         <code className="font-mono font-bold">pages/index.tsx</code>
  //       </p>
  //       <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
  //         <a
  //           className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
  //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           By{" "}
  //           <Image
  //             src="/vercel.svg"
  //             alt="Vercel Logo"
  //             className="dark:invert"
  //             width={100}
  //             height={24}
  //             priority
  //           />
  //         </a>
  //       </div>
  //     </div>

  //     <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
  //       <Image
  //         className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
  //         src="/next.svg"
  //         alt="Next.js Logo"
  //         width={180}
  //         height={37}
  //         priority
  //       />
  //     </div>

  //     <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
  //       <a
  //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
  //           Docs{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p
  //           className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
  //         >
  //           Find in-depth information about Next.js features and API.
  //         </p>
  //       </a>

  //       <a
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
  //           Learn{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p
  //           className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
  //         >
  //           Learn about Next.js in an interactive course with&nbsp;quizzes!
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
  //           Templates{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p
  //           className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
  //         >
  //           Discover and deploy boilerplate example Next.js&nbsp;projects.
  //         </p>
  //       </a>

  //       <a
  //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
  //         className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
  //           Deploy{" "}
  //           <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
  //             -&gt;
  //           </span>
  //         </h2>
  //         <p
  //           className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
  //         >
  //           Instantly deploy your Next.js site to a shareable URL with Vercel.
  //         </p>
  //       </a>
  //     </div>
  //   </main>
  // );
}
