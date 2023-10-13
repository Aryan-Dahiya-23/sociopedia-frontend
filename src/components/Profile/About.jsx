const About = (user) => {

    const { fName, lName } = user.user

    console.log(user);

    const intro = `Hi my name is ${fName} ${lName}.Welcome to my Sociopedia account.`

    return (
        <div className="bg-white w-[95%] m-auto mt-7 p-4 rounded-xl lg:w-2/5 lg:ml-[32.5%] lg:mt-16">
            <div className="text-base md:text-lg">
                {intro}
            </div>
        </div>
    );
}

export default About;