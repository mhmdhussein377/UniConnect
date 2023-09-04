const index = ({own}) => {
    return (
        <div className={`flex gap-2 mt-4 ${own && "justify-start flex-row-reverse"}`}>
            <div
                className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center">
                <img
                    src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                    alt="profile-picture"/>
            </div>
            <div className="flex flex-col max-w-[60%]">
                <div
                    className={`flex items-center justify-between ${own && "flex-row-reverse"}`}>
                    <div>Jasmine Smith</div>
                    <div className="text-sm">Today 5:54 AM</div>
                </div>
                <div className={`px-4 py-2 bg-primary text-white rounded-md ${own ? "rounded-tr-none" : "rounded-tl-none"}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, facere iste
                    eaque nam nobis a dolor voluptates voluptatem, labore magni deserunt quis
                    aspernatur soluta suscipit incidunt itaque qui ullam. Provident?
                </div>
            </div>
        </div>
    );
}

export default index