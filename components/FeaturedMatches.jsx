"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { roundNumberIfDecimalSix } from "./Commentary";

const FeaturedMatches = () => {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getMatches = async () => {
        setLoading(true);
        let res = await fetch('https://m.cricbuzz.com/api/home');
        res = await res.json();
        setMatches(res?.matches);
        setLoading(false);
        // console.log(res?.matches)
    }

    useEffect(() => {
        getMatches();
    }, [matches])

    return (
        <div className=" bg-slate-100 px-6 py-4">
            <h1 className=" text-[#009270] font-bold text-xl">
                Featured Matches
            </h1>

            <div className=" mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {
                    matches.map((item, index) => {
                        return (
                            <Link href={`/${item?.match?.matchInfo?.matchId}`} className=" bg-white p-2 rounded-md w-auto flex flex-col gap-3 cursor-pointer">
                                <p className=" text-slate-500 text-[10px]">{item?.match?.matchInfo?.matchDesc} {item?.match?.matchInfo?.seriesName}</p>
                                {
                                    item?.match.matchScore ? (
                                        <>
                                            <div className=" flex font-bold gap-6 justify-between">
                                                <h1 className=" flex items-center gap-2">
                                                    <Image src={`https://static.cricbuzz.com/a/img/v1/72x54/i1/c${item?.match?.matchInfo?.team1?.imageId}/team_flag.jpg`} width={30} height={20} />
                                                    {item?.match?.matchInfo?.team1?.teamSName}
                                                    </h1>
                                                <h1>{item?.match?.matchScore?.team1Score?.inngs1?.runs}/{item?.match?.matchScore?.team1Score?.inngs1?.wickets} ({roundNumberIfDecimalSix(item?.match?.matchScore?.team1Score?.inngs1?.overs)}) </h1>
                                            </div>
                                            <div className=" flex font-bold gap-6 justify-between">
                                            <h1 className=" flex items-center gap-2">
                                                    <Image src={`https://static.cricbuzz.com/a/img/v1/72x54/i1/c${item?.match?.matchInfo?.team2?.imageId}/team_flag.jpg`} width={30} height={20} />
                                                    {item?.match?.matchInfo?.team2?.teamSName}
                                                    </h1>
                                                <h1>{item?.match?.matchScore?.team2Score?.inngs1?.runs}/{item?.match?.matchScore?.team2Score?.inngs1?.wickets}  ({roundNumberIfDecimalSix(item?.match?.matchScore?.team2Score?.inngs1?.overs)}) </h1>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className=" flex font-bold gap-6 justify-between">
                                            <h1 className=" flex items-center gap-2">
                                                    <Image src={`https://static.cricbuzz.com/a/img/v1/72x54/i1/c${item?.match?.matchInfo?.team1?.imageId}/team_flag.jpg`} width={30} height={20} />
                                                    {item?.match?.matchInfo?.team1?.teamSName}
                                                </h1>
                                                <h1>0/0 (0)</h1>
                                            </div>
                                            <div className=" flex font-bold gap-6 justify-between">
                                            <h1 className=" flex items-center gap-2">
                                                    <Image src={`https://static.cricbuzz.com/a/img/v1/72x54/i1/c${item?.match?.matchInfo?.team2?.imageId}/team_flag.jpg`} width={30} height={20} />
                                                    {item?.match?.matchInfo?.team2?.teamSName}
                                                    </h1>
                                                <h1>0/0 (0)</h1>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    item?.match?.matchInfo?.state != "Preview" ? (
                                        <p className=" text-green-500 text-[13px]">{item?.match?.matchInfo?.state} {item?.match?.matchInfo?.status}</p>
                                    ) : ((
                                        <p className=" text-green-500 text-[13px]"> {item?.match?.matchInfo?.status}</p>
                                    ))
                                }

                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FeaturedMatches