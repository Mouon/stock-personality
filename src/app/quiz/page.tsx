import type {Metadata} from "next";
import {Quiz} from "@/components/Quiz";
export const metadata:Metadata={title:"나라는 종목, 알아보기",robots:{index:false,follow:true}};
export default function QuizPage(){return <Quiz/>;}
