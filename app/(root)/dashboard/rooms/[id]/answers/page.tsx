import { getMembersActions } from "@/actions/index";
import React from "react";
interface IAnswersSectionProps {
  params: { id: string };
  searchParams: {};
}
const AnswersSection = async ({ params: { id } }: IAnswersSectionProps) => {
  const members = await getMembersActions(id);
  console.log(members);
  return <div>AnswersSection</div>;
};

export default AnswersSection;
