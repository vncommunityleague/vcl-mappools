import { useRouter } from "next/router";
import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Footer, Header } from "../index";
import { handleExitComplete } from "../../utils";

type Props = {
    children?: ReactNode;
};

const fade = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const Layout = ({ children }: Props) => {
    const router = useRouter();

    return (
        <>
            <Header />
            <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
                <motion.div
                    key={router.route}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={fade}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="max-w-9xl mx-auto mb-12 px-4 sm:px-6 md:px-8"
                >
                    <div className="mt-4 font-betvietnampro">{children}</div>
                </motion.div>
            </AnimatePresence>
            <Footer />
        </>
    );
};

export default Layout;
