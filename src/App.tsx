import MainDropDownSelect from "./components/Select/MainDropdownSelect";

const App = () => {
  return (
    <div className="flex flex-col gap-2 h-[100vh] justify-center items-center w-[200px]">
      <MainDropDownSelect
        options={[
          {
            value: "1",
            label: "1",
          },
          {
            value: "2",
            label: "2",
          },
        ]}
      />
    </div>
  );
};

export default App;
