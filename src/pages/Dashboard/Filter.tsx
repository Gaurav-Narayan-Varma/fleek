export default function Filter(props: any) {
  return (
    <section
      id="stage-nav-bar"
      className="bg-yellow-200 text-black flex justify-around p-15 font-medium h-8 items-center rounded-lg mt-2 mx-2 bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      {props.stages.map((currentStage: any) => (
        <div
          id="stage-header"
          className={props.getClassName(currentStage)}
          onClick={props.handleStageClick}
          key={currentStage}
        >
          {props.getStageHeaderText(currentStage)}
        </div>
      ))}
    </section>
  );
}
