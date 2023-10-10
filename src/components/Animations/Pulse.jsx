/* eslint-disable react/prop-types */
const Pulse = (props) => {

    const { imageHeight, imageWidth, height } = props;

    return (
        <div className={`rounded-md p-2 w-full lg:p-4`}>

            <div className="animate-pulse flex space-x-4">

                <div className={`${imageHeight} ${imageWidth} rounded-full bg-secondary-200`}></div>

                <div className="flex-1 space-y-6 py-1">

                    <div className={`${height} bg-secondary-200 rounded-3xl`}></div>

                    <div className="space-y-3">

                        <div className="grid grid-cols-3 gap-4">
                            <div className={`${height} bg-secondary-200 rounded-3xl col-span-2`}></div>
                            <div className={`${height} bg-secondary-200 rounded-3xl col-span-1`}></div>
                        </div>

                        <div className={`${height} bg-secondary-200 rounded-3xl`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pulse;






































// const Pulse = (props) => {

//     const { imageHeight, imageWidth, height } = props;

//     return (
//         <div className="rounded-md p-4 w-full m-auto lg:w-2/5 lg:ml-[32.5%]">

//             <div className="animate-pulse flex space-x-4">

//                 <div className={`${imageHeight} ${imageWidth} rounded-full bg-secondary-200`}></div>

//                 <div className="flex-1 space-y-6 py-1">

//                     <div className={`${height} bg-secondary-200 rounded-3xl`}></div>

//                     <div className="space-y-3">

//                         <div className="grid grid-cols-3 gap-4">
//                             <div className={`${height} bg-secondary-200 rounded-3xl col-span-2`}></div>
//                             <div className={`${height} bg-secondary-200 rounded-3xl col-span-1`}></div>
//                         </div>

//                         <div className={`${height} bg-secondary-200 rounded-3xl`}></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Pulse;