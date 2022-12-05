export const handleExitComplete = () => {
    if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0 });
    }
};
