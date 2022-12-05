import Link from "next/link";
import Image from "next/legacy/image";

const Header = () => {
    return (
        <header
            className="relative w-full flex-none border-b border-b-neutral-800 font-betvietnampro text-lg font-semibold">
            <div className="max-w-8xl px-4 py-3 mx-auto">
                <div className="flex justify-center items-center">
                    <div>
                        <Link href="/" className="w-96">
                            <div className="relative w-16 h-16">
                                <Image
                                    src="/assets/images/yae_browser.png"
                                    alt="Yae Miko Browser"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
