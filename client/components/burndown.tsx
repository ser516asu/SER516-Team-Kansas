"use client"

import { getBurndowMetrics, getProjectMilestones } from "@/actions/project"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import BurndownChart from "./burndownChart"
import { useRouter } from "next/navigation"


function Burndown({slug, sprints}:{slug: string, sprints:{id: string, value: string}[]}) {

    const router = useRouter();

    const [selectedSprintID, setselectedSprintID] = useState("")
    const [showChart, setShowChart] = useState(true)
    const [labels, setLabels] = useState<string[]>([])
    const [open_points, setopen_points] = useState<number[]>([])


    useEffect(() => {
        getBurndowMetrics(selectedSprintID)
            .then((data: any) => {
                if(!data){
                    router.refresh();
                    return
                }
                setShowChart(false);
                const daysArray = data.map((item: any) => item.day);
                setLabels(daysArray);
                const open_points = data.map((item: any) => item.open_points);
                setopen_points(open_points);
                setShowChart(true);
            })
    }, [selectedSprintID])


    const data = {
        labels,
        datasets: [
            {
                label: 'Open points',
                data: open_points,
                borderColor: '#000',
                backgroundColor: '#666',
            },
        ],
    };

    return (
        <div className="flex border-2 border-slate-300 rounded-md divide-x-2">
            <div className="filters flex flex-col divide-y-2">
                <div className="p-8 font-bold">Filters</div>
                <div className="p-8">
                    <Select onValueChange={(e) => setselectedSprintID(e)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sprint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sprints</SelectLabel>
                                {sprints && sprints.map(sprint =>
                                    <SelectItem key={sprint.id} value={sprint.id}>{sprint.value}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {showChart ? <BurndownChart data={data} /> : <div className="flex-1 p-16 min-h-50">Loading...</div>}
        </div>
    )
}

export default Burndown
