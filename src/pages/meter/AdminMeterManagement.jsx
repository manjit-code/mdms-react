// src/pages/admin/AdminUserRoleManagement.jsx
import React, { useState } from "react";
import QuickActionButton from "../../components/ui/button/QuickActionButton";
import { UserPlus, Edit, Power, Eye, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Dropdown from "../../components/ui/uncategorized/Dropdown";
import ActionMenuCell from "../../components/ui/form/ActionMenuCell";
import TableComponent from "../../components/ui/table/TableComponent";
import FilledLineChart from "../../components/ui/charts/FilledLineChart";

export default function AdminMeterManagement() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  // --- Table Column Definitions ---
  const columns = [
    { key: "MeterID", label: t("enterprise.meter_management.meter_id") || "Meter ID" },
    { key: "Zone", label: t("enterprise.meter_management.zone") },
    { key: "Owner", label: t("enterprise.meter_management.owner") },
    { key: "Status", label: t("enterprise.meter_management.status") },
    { key: "LastReading", label: t("enterprise.meter_management.last_reading") },
  ];

  // --- Dummy Table Data ---
  const dummyData = [
    { MeterID: 123, Zone: "Mangalore", Owner: "abc", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 124, Zone: "Mangalore", Owner: "xyz", Status: "De-Activated", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 125, Zone: "Udupi", Owner: "abc", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 126, Zone: "Padil", Owner: "xyz", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 127, Zone: "Derlakatte", Owner: "pqr", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 128, Zone: "Bantwal", Owner: "abc", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 129, Zone: "Surathkal", Owner: "xyz", Status: "De-Activated", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 130, Zone: "Pumpwell", Owner: "abc", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 131, Zone: "Kotekar", Owner: "pqr", Status: "De-Activated", LastReading: "2025-10-07T07:15:13Z" },
    { MeterID: 132, Zone: "Ullal", Owner: "xyz", Status: "Active", LastReading: "2025-10-07T07:15:13Z" },
  ];

  // --- Dummy Chart Data by Year ---
  const chartDataByYear = {
    2024: [
      { zone: "Mangalore", usage: 60 },
      { zone: "Kotekar", usage: 72 },
      { zone: "Pumpwell", usage: 40 },
      { zone: "Derlakatte", usage: 20 },
      { zone: "Padil", usage: 35 },
      { zone: "Udupi", usage: 78 },
      { zone: "Bantwal", usage: 88 },
      { zone: "Surathkal", usage: 65 },
    ],
    2025: [
      { zone: "Mangalore", usage: 50 },
      { zone: "Kotekar", usage: 75 },
      { zone: "Pumpwell", usage: 30 },
      { zone: "Derlakatte", usage: 15 },
      { zone: "Padil", usage: 25 },
      { zone: "Udupi", usage: 70 },
      { zone: "Bantwal", usage: 95 },
      { zone: "Surathkal", usage: 80 },
    ],
  };

  // Chart Section
  <FilledLineChart
    title={t("enterprise.meter_management.trend_chart_title")}
    dataByYear={chartDataByYear}
  />

  // --- Actions Dropdown ---
  const actions = [
    { label: t("enterprise.meter_management.view"), icon: Eye, onClick: (row) => alert(`${t("enterprise.meter_management.view")}: ${row.MeterID}`) },
    { label: t("enterprise.meter_management.edit"), icon: Edit, onClick: (row) => alert(`${t("enterprise.meter_management.edit")}: ${row.MeterID}`) },
    { label: t("enterprise.meter_management.delete"), icon: Power, onClick: (row) => alert(`${t("enterprise.meter_management.delete")}: ${row.MeterID}`) },
  ];

  const renderActionCell = (row) => (
    <ActionMenuCell row={row} rowKey="MeterID" actions={actions} />
  );

  // --- Filtering and Searching ---
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const selectedColumnKey = columns[selectedIndex].key;

    if (value.trim() === "") {
      setFilteredData(dummyData);
    } else {
      const newData = dummyData.filter((row) =>
        row[selectedColumnKey]?.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredData(dummyData);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className={`text-xl font-semibold ${theme.text.primary}`}>
          {t("enterprise.meter_management.global_meter_management")}
        </h1>
        <QuickActionButton
          icon={UserPlus}
          label={t("enterprise.meter_management.add_meter")}
        />
      </div>

      {/* Filter Section */}
      <div
        className={`flex items-center border-2 ${theme.border.primary} ${theme.background.card} rounded-lg p-2 mt-2`}
      >
        {/* Dropdown */}
        <div className="w-1/5">
          <Dropdown
            items={columns.map((col) => col.label)}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-400 mx-4"></div>

        {/* Search Input */}
        <div className={`${theme.background.card} relative w-4/5`}>
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder={t("enterprise.meter_management.search_placeholder")}
            className={`w-full px-4 py-2 ${theme.background.card} focus:outline-none`}
          />
          {searchText && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4">
        <TableComponent
          dummyData={filteredData}
          columns={columns}
          showActions={true}
          renderActionCell={renderActionCell}
          pagination={true}
        />
      </div>

      {/* Chart Section */}
      <FilledLineChart
        dataByYear={chartDataByYear}
        title={t("enterprise.meter_management.trend_chart_title")}
      />
    </div>
  );
}
