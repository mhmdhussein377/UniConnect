const index = ({data}) => {
    return (
        <div
            className="bg-white dark:bg-black dark:text-white drop-shadow-lg rounded-md p-4 flex flex-col gap-3">
            <div className="text-xl font-semibold text-primary">About</div>
            <p className="text-[15px]">{data}</p>
        </div>
    );
}

export default index