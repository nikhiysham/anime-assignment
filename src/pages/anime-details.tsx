import React, { useEffect } from "react";
import "../styles/index.css";
import { useParams } from "react-router";
import { useAnimeById } from "../api";
import Header from "../components/web-header";

export default function AnimeDetails() {
  let params = useParams();

  const { data: anime, isLoading } = useAnimeById(params?.id);

  useEffect(() => {
    console.log("data:", anime);
  }, [anime]);

  const Card = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: string;
    color: string;
  }) => {
    return (
      <div className={`flex flex-col p-4 rounded-sm  text-center ${color}`}>
        <div className="font-bold text-white text-2xl">{value}</div>
        <div className="font-semibold text-slate-700 text-md">{label}</div>
      </div>
    );
  };

  const CardSection = () => {
    return (
      <div className="mt-5 grid grid-cols-4 gap-4 place-content-evenly">
        <Card
          label={`${anime?.scored_by?.toLocaleString()} users`}
          value={`${anime?.score}`}
          color="bg-red-300"
        />
        <Card label={`Ranked`} value={`#${anime?.rank}`} color="bg-green-300" />
        <Card
          label={`Popularity`}
          value={`#${anime?.popularity}`}
          color="bg-purple-300"
        />
        <Card
          label={`Members`}
          value={`${anime?.members?.toLocaleString()}`}
          color="bg-yellow-300"
        />
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="w-full flex-row flex justify-center mt-8 ">
        Loading...
      </div>
    );

  return (
    <div className="w-full flex-col flex">
      <Header title={anime?.title ? anime?.title_english : ""} />
      <div className="flex flex-col md:flex-row md:w-8/12 mx-auto mt-8 ">
        <img
          src={anime?.images.jpg.image_url}
          className="md:w-full w-3/4 mx-auto"
        />

        <div className="flex flex-col md:ml-3">
          <div className="pb-4">
            <strong>Synopsis</strong>
            <div>{anime?.synopsis}</div>
          </div>

          <CardSection />
        </div>
      </div>
    </div>
  );
}
