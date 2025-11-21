import GitHubCalendar from "react-github-calendar";

export default function Heatmap({ label }: { label: string }) {
  return (
    <div className="bentoComponents">
      <div className="title">{label} Heatmap</div>
      <div className="content">
        <GitHubCalendar username="nyayat" />
      </div>
    </div>
  );
}
