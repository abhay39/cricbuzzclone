"use client"
import Link from "next/link";
import { useEffect, useState } from "react"


export const  roundNumberIfDecimalSix=(number)=> {
  let parts = number.toString().split('.');
  if (parts.length === 2 && parts[1] === '6') {
      return Math.ceil(number);
  }
  return number;
}

const Commentary = ({ id }) => {

  const [scoreData, setScoreData] = useState([]);
  const scores = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/miniScore/${id}`)
    res = await res.json()
    setScoreData(res)
  }


  useEffect(() => {
    scores();
  }, [scoreData])

  

  return (
    <section className="">
     
      {
        scoreData?.miniscore?.matchScoreDetails?.inningsScoreList?.map((item,index)=>{
          return(
            <div className=" mb-2 mt-2">
            <div className=" px-6 flex gap-2" key={index}>
              <span className=" text-sm text-gray-500">{item?.inningsId} inning</span>
              <h1 className=" font-bold">{item?.batTeamName} {item?.score}/{item?.wickets} ({roundNumberIfDecimalSix(item?.overs)})</h1>
            </div>
            <hr />
            </div>
          )
        })
      }
      
      <div className=" px-6 flex gap-3">
        <h1 className=" text-red-500">{scoreData?.miniscore?.status}</h1>
        <h1 className=" text-gray-500">CRR: {scoreData?.miniscore?.currentRunRate}</h1>
        <h1 className=" text-gray-500">REQ: {scoreData?.miniscore?.requiredRunRate}</h1>
      </div>
      <div className="w-full">
        <div className=" flex px-6 py-4 bg-slate-200 items-center w-full">
          <span className=" font-bold w-[400px]">Batter</span>
          <span className=" font-bold w-[100px]">R</span>
          <span className=" font-bold w-[100px]">B</span>
          <span className=" font-bold w-[100px]">4s</span>
          <span className=" font-bold w-[100px]">6s</span>
          <span className=" font-bold w-[100px]">SR</span>
        </div>

        <div>
          <div className="flex text-sm px-6 py-1 items-center w-full">
            <div className=" flex justify-between items-center gap-10 w-[400px] ">
              <Link href={"/"} className="font-bold flex gap-8">{scoreData?.miniscore?.batsmanStriker?.batName}*</Link>
            </div>

            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanStriker?.batRuns}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanStriker?.batBalls}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanStriker?.batFours}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanStriker?.batSixes}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanStriker?.batStrikeRate}</span>
          </div>
          <hr />
        </div>

        <div>
          <div className="flex text-sm px-6 py-1 items-center w-full">
            <div className=" flex justify-between items-center gap-10 w-[400px] ">
              <Link href={"/"} className="font-bold flex gap-8">{scoreData?.miniscore?.batsmanNonStriker?.batName}</Link>
            </div>

            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanNonStriker?.batRuns}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanNonStriker?.batBalls}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanNonStriker?.batFours}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanNonStriker?.batSixes}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.batsmanNonStriker?.batStrikeRate}</span>
          </div>
          <hr />
        </div>

        <div className=" flex px-6 py-2 bg-slate-200 items-center w-full">
          <span className=" font-bold w-[400px]">Bowlers</span>
          <span className=" font-bold w-[100px]">O</span>
          <span className=" font-bold w-[100px]">M</span>
          <span className=" font-bold w-[100px]">R</span>
          <span className=" font-bold w-[100px]">W</span>
          <span className=" font-bold w-[100px]">NB</span>
          <span className=" font-bold w-[100px]">WD</span>
          <span className=" font-bold w-[100px]">ECO</span>
        </div>
        <div>
          <div className="flex text-sm px-6 py-1 items-center w-full">
            <div className=" flex justify-between items-center gap-10 w-[400px] ">
              <Link href={"/"} className="font-bold flex gap-8">{scoreData?.miniscore?.bowlerStriker?.bowlName}*</Link>
            </div>

            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlOvs}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlMaidens}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlRuns}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlWkts}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlNoballs}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlWides}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerStriker?.bowlEcon}</span>
          </div>
          <hr />
        </div>


        
        <div>
          <div className="flex text-sm px-6 py-1 items-center w-full">
            <div className=" flex justify-between items-center gap-10 w-[400px] ">
              <Link href={"/"} className="font-bold flex gap-8">{scoreData?.miniscore?.bowlerNonStriker?.bowlName}</Link>
            </div>

            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlOvs}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlMaidens}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlRuns}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlWkts}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlNoballs}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlWides}</span>
            <span className="font-bold w-[100px]">{scoreData?.miniscore?.bowlerNonStriker?.bowlEcon}</span>
          </div>
          <hr />
        </div>

        <h1 className=" font-bold px-6 py-2  mb-2 shadow-lg bg-slate-50 ">Recent: <span className=" font-light ">{scoreData?.miniscore?.recentOvsStats}</span></h1>



        <div className=" px-6 py-4">
          {
            scoreData?.commentaryList?.map((item,index)=>{
              
              return(
                <div key={index} className=" mb-3">
                  {
                    item?.overSeparator && (
                      <div className=" bg-slate-200 flex gap-6  px-6 py-4 mb-2">
                        <h1 className=" font-bold text-xl">{roundNumberIfDecimalSix(item?.overSeparator?.overNum)}</h1>
                        <div className=" h-auto border border-slate-600"></div>
                        <div>
                          <h1>
                            Runs Scored: <span className=" font-bold">{item?.overSeparator?.runs}</span>
                          </h1>
                          <h1 className=" font-bold">{item?.overSeparator?.o_summary}</h1>
                        </div>
                        <div className=" h-auto border border-slate-600"></div>
                        <div>
                          <h1>
                            Score after {roundNumberIfDecimalSix(item?.overSeparator?.overNum)} over
                          </h1>
                          <h1 className=" font-bold">{item?.overSeparator?.score}/{item?.overSeparator?.wickets}</h1>
                        </div>


                        <div className=" h-auto border border-slate-600"></div>
                        <div>
                          <h1>
                            {item?.overSeparator?.batStrikerNames}* {item?.overSeparator?.batStrikerRuns}({item?.overSeparator?.batStrikerBalls}) 
                          </h1>
                          <h1>
                            {item?.overSeparator?.batNonStrikerNames} {item?.overSeparator?.batNonStrikerRuns}({item?.overSeparator?.batNonStrikerBalls}) 
                          </h1>
                          
                        </div>
                        <div className=" h-auto border border-slate-600"></div>
                        <div>
                          <h1>
                            {item?.overSeparator?.bowlNames}* {item?.overSeparator?.bowlOvers}-{item?.overSeparator?.bowlMaidens}-{item?.overSeparator?.bowlRuns}-{item?.overSeparator?.bowlWickets}
                          </h1>
                          
                          
                        </div>


                      </div>
                    )
                  }
                  <div className=" flex gap-10">
                    <p className=" font-bold ">{item?.overNumber}</p>
                    <p>{item?.commText}</p>
                  </div>
                  <hr className=" mb-3"/>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Commentary