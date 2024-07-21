import Image from "next/image"

export default function Footer() {
    return(
        <footer className="shadow dark:bg-zinc-950 mt-20">
            <div className="w-full mx-auto max-w-screen-xl p-8 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                <a href="https://www.themoviedb.org/" className="hover:underline">
                    <Image src="/logo-tmdb.svg" alt="logo tmdb" width={64} height={64}/>
                </a>
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <p className="hover:underline me-4 md:me-6">Hecho por Ariel Montes utilizando la api themoviedb</p>
                </li>
            </ul>
            </div>
        </footer>
    )
}