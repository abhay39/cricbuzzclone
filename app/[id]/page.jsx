"use client"
import Commentary from "@/components/Commentary";
import ScoreBoard from "@/components/ScoreBoard";

import { useEffect, useState } from "react"


const lists=[
  {
    id:1,
    name:"Commentary"
  },
  {
    id:2,
    name:"Scorecard"
  },
  {
    id:3,
    name:"Squads"
  },
  {
    id:4,
    name:"Highlights"
  },
  {
    id:5,
    name:"Full Commentary"
  },
  {
    id:6,
    name:"Points Table"
  },
  {
    id:7,
    name:"Match Facts"
  },
]
const page = ({ params }) => {

  const [scoreData, setScoreData] = useState('');
  const [openDrop, setOpenDrop] = useState(false);
  const [selectedIndex, setSelectedIndex]=useState(0)

  const open = () => {
    setOpenDrop(!openDrop)
  }

  const scores = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/matchDetails/${params.id}`)
    res = await res.json()
    setScoreData(res)
  }


  useEffect(() => {
    scores();
  }, [scoreData])

  return (
    <section>
      {
        params.id && (
          <div>
            <div className=" px-6 py-4 shadow-lg bg-slate-50
             ">
              <h1 className=" font-bold">{scoreData?.team1?.name} vs {scoreData?.team2?.name}, {scoreData?.matchDescription}, Live Cricket Score, Commentary</h1>
              <div>
                <h1 className=" font-bold">Series: <span className=" font-light">{scoreData?.seriesName}</span></h1>
                
              </div>
              <h1 className=" font-bold text-red-500">{scoreData?.status}</h1>
              
              
            </div>
            <div >
              <ul className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-10 w-full bg-slate-200 px-6 py-4">
              {
                lists.map((item,index)=>{
                  return(
                    <li onClick={()=>{
                      setSelectedIndex(index)
                    }} className={`${selectedIndex===index?" underline text-red-600 font-bold ":"text-gray-500"} cursor-pointer`}  key={item.id}>
                      {item.name}
                    </li>
                  )
                })
              }
              </ul>
            </div>
            <div>
              {selectedIndex == 0 && <Commentary id={params?.id} />}
              {selectedIndex == 1 && <ScoreBoard id={params?.id} />}
            </div>
          </div>
        )
      }
      
    </section>
  )
}

export default page