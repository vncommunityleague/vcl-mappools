const Footer = () => {
    return (
        <footer className="mb-20 font-betvietnampro">
            <hr className="w-[50%] lg:w-[32%] mx-auto mb-7 border-neutral-600 border rounded-xl" />
            <div className="mt-3">
                <p className="text-center">
                    <small>
                        Copyright &copy; {new Date().getFullYear()}{" "}
                        <a
                            href="https://github.com/vncommunityleague"
                            target="_blank" rel="noopener noreferrer"
                        >
                            Vietnam Community League
                        </a>
                    </small>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
