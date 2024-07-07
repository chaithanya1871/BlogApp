const Footer = () => {
    return (
        <div className="w-full h-[2rem] border-t-[1.5px] shadow-md shadow-slate-300 p-6 mt-10">
            <div className=" flex items-center justify-center mx-auto max-w-[1080px] h-full">
                <p className="text-sm">Copyright &copy; {new Date().getFullYear()}, Blog. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;