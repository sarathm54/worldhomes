import React from "react";

export default function PropertyList({ children, isOpen, setIsOpen }) {
    return <>
        <main
        className={
            " fixed overflow-hidden pointer-events-none z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
            (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
            >
            <section
                className={
                " w-screen max-w-lg right-0 absolute bg-gray-900 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform bg-slate " +
                (isOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                    <header className="p-4 font-bold text-lg">Back to home</header>
                    {children}
                </article>
            </section>
            <section
                className=" w-screen h-full pointer-events-none "
                // onClick={() => {
                // setIsOpen(false);
                // }}
            ></section>
        </main>
    </>
}
