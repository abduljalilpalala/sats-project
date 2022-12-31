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

const Dashboard: NextPage = (): JSX.Element => {
  const { getDashboardData } = adminHooks();
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(years?.length - 1);
  const [selected, setSelected] = useState<string>(years[selectedIndex]);

  const { innerWidth } = useWindowDimensions() || {};
  const mobileView = innerWidth <= 1000;

  const { batch, total_posts, total_users } = dashboardData || {};
  const { employed, selfEmployed, unemployed } = batch || {};

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
