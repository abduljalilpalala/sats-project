import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import { NextPage } from 'next';
import { Chart } from "react-google-charts";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import Card from '~/components/templates/Card';
import Loader from '~/components/atoms/Loader';
import adminHooks from '~/hooks/admin/adminHooks';
import AdminLayout from '~/components/templates/AdminLayout';
import useWindowDimensions from '~/hooks/useWindowDimensions';

type Dashboard = {
  batch: {
    employed: number,
    selfEmployed: number,
    unemployed: number,
  };
  total_posts: number,
  total_users: number,
};

const years = [
  '2017 - 2018',
  '2018 - 2019',
  '2019 - 2020',
  '2020 - 2021',
  '2021 - 2022',
];

const courses = [
  'All Courses',
  'BSIT',
  'BSED',
  'BEED',
  'BPED',
  'BSBA',
];

const Dashboard: NextPage = (): JSX.Element => {
  const { getDashboardData } = adminHooks();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(years?.length - 1);
  const [selected, setSelected] = useState<string>(years[selectedIndex]);

  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[selectedCourseIndex]);

  const { innerWidth } = useWindowDimensions() || {};
  const mobileView = innerWidth <= 1000;

  const { batch, total_posts, total_users, listOfGraduated } = dashboardData || {};
  const { employed, selfEmployed, unemployed } = batch || {}; 
  const bsit = listOfGraduated && listOfGraduated[0]?.BSIT
  const bsed = listOfGraduated && listOfGraduated[1]?.BSED
  const beed = listOfGraduated && listOfGraduated[2]?.BEED
  const bped = listOfGraduated && listOfGraduated[3]?.BPED
  const bsba = listOfGraduated && listOfGraduated[4]?.BSBA

  useEffect(() => {
    getDashboardData(selectedIndex + 1).then((res) => {
      setDashboardData(res);
    });
  }, [selectedIndex]);
  
  const data = [
    [
      "Employment Status",
      "Alumni",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    [mobileView ? null : "Employed", employed, "#083C76", mobileView ? "Employed" : null],
    [mobileView ? null : "Unemployed", unemployed, "#083C76", mobileView ? "Unemployed" : null],
    [mobileView ? null : "Self Employed", selfEmployed, "#083C76", mobileView ? "Self Employed" : null],
  ];

  const options = {
    bar: { groupWidth: "75%" },
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: { 'width': mobileView ? "100%" : '' },
  };

  const allCourses: any = [
    ["BSIT - Employed", bsit?.employed],
    ["BSIT - Unemployed", bsit?.unemployed],
    ["BSED - Employed", bsed?.employed],
    ["BSED - Unemployed", bsed?.unemployed],
    ["BEED - Employed", beed?.employed],
    ["BEED - Unemployed", beed?.unemployed],
    ["BPED - Employed", bped?.employed],
    ["BPED - Unemployed", bped?.unemployed],
    ["BSBA - Employed", bsba?.employed],
    ["BSBA - Unemployed", bsba?.unemployed]
  ]
  
  const filterPieChartData = [...allCourses.filter((each:any)=>{
    return each[0].includes(selectedCourse)
  })] 
  const filterResult = filterPieChartData.length >= 1 ? [...filterPieChartData] : [...allCourses];

  const pieChartData = [
    ["Task", "Hours per Day"],
    ...filterResult
  ]; 

  const slices: any =  {
    0: { color: "#87ceeb" }, 
    1: { color: "#000080" }, 
    2: { color: "#87ceeb" }, 
    3: { color: "#000080" }, 
    4: { color: "#87ceeb" }, 
    5: { color: "#000080" }, 
    6: { color: "#87ceeb" }, 
    7: { color: "#000080" }, 
    8: { color: "#87ceeb" }, 
    9: { color: "#000080" }, 
  }

  const pieChartOptions = {
    legend: { position: "none" },
    backgroundColor: 'transparent',
    chartArea: { 'width': mobileView ? "100%" : '' },
    is3D: true,
    slices
  };

  const DashboardContent = () => {
    return (
      <div className={`z-0 ${mobileView ? 'px-5' : 'px-20'}`}>
        <div className={`grid ${mobileView ? "grid-cols-1 gap-5 py-5" : "grid-cols-2 gap-20 py-10"}`}>
          <Card
            hasHeader={true}
            headerTitle="Total User"
            childClass="p-5"
          >
            <h1 className='text-4xl font-bold'>{total_users}</h1>
          </Card>

          <Card
            hasHeader={true}
            headerTitle="Total Post"
            childClass="p-5"
          >
            <h1 className='text-4xl font-bold'>{total_posts}</h1>
          </Card>
        </div>

        <Card childClass={`${mobileView ? "px-0" : "px-10"}`}>
          <div className={`flex justify-between ${mobileView && 'flex-wrap gap-3'}`}>
            <h1 className='text-sams-30 text-2xl font-semibold flex items-center'>Employment chart</h1>
            <div className="w-[200px]">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate cursor-pointer">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {years.map((year, yearIdx) => (
                        <Listbox.Option
                          key={yearIdx}
                          onClick={() => {
                            setSelectedIndex(yearIdx);
                          }}
                          className={({ active }) =>
                            `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-sams-10 text-slate-50' : 'text-gray-900'
                            }`
                          }
                          value={year}
                        >
                          {({ selected }) => (
                            <div>
                              <span
                                className={`block text-left truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {year}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 slate-10">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
          />
        </Card>
        <br />
        <Card childClass={`${mobileView ? "px-0" : "px-10 py-5"}`}>
          <div className={`flex justify-between ${mobileView && 'flex-wrap gap-3'}`}>
            <h1 className='text-sams-30 text-2xl font-semibold flex items-center'>List of Graduated</h1>
            <div className="w-[200px]">
              <Listbox value={selectedCourse} onChange={setSelectedCourse}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate cursor-pointer">{selectedCourse}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {courses.map((course, courseIdx) => (
                        <Listbox.Option
                          key={courseIdx}
                          onClick={() => {
                            setSelectedCourseIndex(courseIdx);
                          }}
                          className={({ active }) =>
                            `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-sams-10 text-slate-50' : 'text-gray-900'
                            }`
                          }
                          value={course}
                        >
                          {({ selected }) => (
                            <div>
                              <span
                                className={`block text-left truncate ${selectedCourse ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {course}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 slate-10">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className={`w-full flex ${mobileView && 'flex-col gap-5'}`}>
            <div className={`w-full ${!mobileView && 'min-h-[400px]'}`}>
              <Chart
                chartType="PieChart"
                width="100%"
                height="100%"
                data={pieChartData}
                options={pieChartOptions}
              />
            </div>
            <div className="w-full p-5 text-start">
              <div className="flex flex-col">
                {pieChartData.map((data: any, index: number)=>{ 
                  if ( index === 0 ) return null
                  return (
                    <div className={`flex justify-start items-center gap-1 ${index % 2 === 0 || "mt-6"}`} key={index}>
                      <div className="rounded-full !h-[10px] !w-[10px]" style={{'backgroundColor': slices[index - 1]?.color}}></div>
                      <div className="w-full flex justify-between items-center">
                        <div>{data[0]}</div>
                        <div className="text-md font-medium">{data[1]}</div>
                      </div> 
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <AdminLayout metaTitle="Administrator | Dashboard">
      {dashboardData ? <DashboardContent /> : <Loader />}
    </AdminLayout >
  );
};

export { AdminSignInOutAuthCheck as getServerSideProps } from '~/utils/getServerSideProps';
export default Dashboard;
