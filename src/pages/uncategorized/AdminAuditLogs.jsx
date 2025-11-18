import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TableComponent from "../../components/ui/table/TableComponent";
import ActionMenuCell from "../../components/ui/form/ActionMenuCell";
import QuickActionButton from "../../components/ui/button/QuickActionButton";

import { Download, X, Eye, Edit, Trash2 } from "lucide-react";

export default function AdminAuditLogs() {
  const theme = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { key: "ID", label: t("enterprise.audit_logs.id") },
    { key: "Timestamp", label: t("enterprise.audit_logs.timestamp") },
    { key: "User", label: t("enterprise.audit_logs.user") },
    { key: "Resource", label: t("enterprise.audit_logs.resource") },
    { key: "Status", label: t("enterprise.audit_logs.status") },
  ];

  const dummyData = [
  { ID: 101, Timestamp: "2025-01-12T09:14:22Z", User: "arun", Resource: "Meter", Status: "Active" },
  { ID: 102, Timestamp: "2025-01-13T10:42:18Z", User: "meena", Resource: "Zone", Status: "Active" },
  { ID: 103, Timestamp: "2025-01-15T12:25:44Z", User: "raju", Resource: "User", Status: "De-Activated" },
  { ID: 104, Timestamp: "2025-01-20T08:05:33Z", User: "priya", Resource: "User", Status: "Active" },
  { ID: 105, Timestamp: "2025-01-25T17:46:55Z", User: "vijay", Resource: "Meter", Status: "Active" },

  { ID: 106, Timestamp: "2025-02-01T11:10:12Z", User: "arun", Resource: "Zone", Status: "Active" },
  { ID: 107, Timestamp: "2025-02-03T09:55:02Z", User: "meena", Resource: "Meter", Status: "Active" },
  { ID: 108, Timestamp: "2025-02-10T14:30:27Z", User: "raju", Resource: "User", Status: "De-Activated" },
  { ID: 109, Timestamp: "2025-02-14T18:20:41Z", User: "priya", Resource: "Zone", Status: "Active" },
  { ID: 110, Timestamp: "2025-02-18T16:50:13Z", User: "vijay", Resource: "User", Status: "De-Activated" },

  { ID: 111, Timestamp: "2025-03-01T07:25:50Z", User: "arun", Resource: "Meter", Status: "Active" },
  { ID: 112, Timestamp: "2025-03-03T13:15:37Z", User: "meena", Resource: "User", Status: "Active" },
  { ID: 113, Timestamp: "2025-03-07T09:18:11Z", User: "raju", Resource: "Zone", Status: "De-Activated" },
  { ID: 114, Timestamp: "2025-03-12T20:47:29Z", User: "priya", Resource: "User", Status: "Active" },
  { ID: 115, Timestamp: "2025-03-15T08:33:56Z", User: "vijay", Resource: "Meter", Status: "Active" },

  { ID: 116, Timestamp: "2025-04-01T10:11:43Z", User: "arun", Resource: "Zone", Status: "Active" },
  { ID: 117, Timestamp: "2025-04-04T11:51:20Z", User: "meena", Resource: "Meter", Status: "De-Activated" },
  { ID: 118, Timestamp: "2025-04-06T14:05:11Z", User: "raju", Resource: "User", Status: "Active" },
  { ID: 119, Timestamp: "2025-04-09T09:45:44Z", User: "priya", Resource: "Zone", Status: "Active" },
  { ID: 120, Timestamp: "2025-04-11T19:15:32Z", User: "vijay", Resource: "User", Status: "De-Activated" },

  { ID: 123, Timestamp: "2025-10-07T07:15:13Z", User: "abc", Resource: "Meter", Status: "Active" },
  { ID: 123, Timestamp: "2025-10-07T07:15:13Z", User: "abc", Resource: "Zone", Status: "Active" },
  { ID: 123, Timestamp: "2025-10-07T07:15:13Z", User: "abc", Resource: "User", Status: "Active" },

  { ID: 124, Timestamp: "2025-10-07T07:15:13Z", User: "xyz", Resource: "meter", Status: "Active" },
  { ID: 124, Timestamp: "2025-10-07T07:15:13Z", User: "xyz", Resource: "zone", Status: "De-Activated" },
  { ID: 124, Timestamp: "2025-10-07T07:15:13Z", User: "xyz", Resource: "user", Status: "De-Activated" },

  { ID: 130, Timestamp: "2025-11-02T06:30:21Z", User: "arun", Resource: "Meter", Status: "Active" },
  { ID: 131, Timestamp: "2025-11-03T11:40:12Z", User: "meena", Resource: "Zone", Status: "Active" },
  { ID: 132, Timestamp: "2025-11-04T15:22:09Z", User: "raju", Resource: "User", Status: "De-Activated" },
  { ID: 133, Timestamp: "2025-11-06T18:19:44Z", User: "priya", Resource: "Meter", Status: "Active" },
  { ID: 134, Timestamp: "2025-11-07T20:46:03Z", User: "vijay", Resource: "User", Status: "Active" },

  { ID: 140, Timestamp: "2025-12-01T09:14:18Z", User: "arun", Resource: "Zone", Status: "Active" },
  { ID: 141, Timestamp: "2025-12-02T10:30:51Z", User: "meena", Resource: "Meter", Status: "De-Activated" },
  { ID: 142, Timestamp: "2025-12-04T07:55:42Z", User: "raju", Resource: "User", Status: "Active" },
  { ID: 143, Timestamp: "2025-12-05T19:30:12Z", User: "priya", Resource: "User", Status: "Active" },
  { ID: 144, Timestamp: "2025-12-06T23:14:33Z", User: "vijay", Resource: "Meter", Status: "De-Activated" },

  { ID: 150, Timestamp: "2025-12-10T12:50:52Z", User: "sam", Resource: "Zone", Status: "Active" },
  { ID: 151, Timestamp: "2025-12-11T13:20:44Z", User: "sam", Resource: "Meter", Status: "Active" },
  { ID: 152, Timestamp: "2025-12-11T14:35:12Z", User: "sam", Resource: "User", Status: "Active" }
];


  // -------------------------------
  //  FILTER LOGIC 
  const filteredData = dummyData.filter((item) => {
    const matchesStatus =
      statusFilter === "" || item.Status.toLowerCase() === statusFilter.toLowerCase();

    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      item.User.toLowerCase().includes(searchLower) ||
      item.Resource.toLowerCase().includes(searchLower) ||
      item.Status.toLowerCase().includes(searchLower) ||
      item.ID.toString().includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  // ACTION MENU
  const actions = [
    { label: t("enterprise.audit_logs.view"), icon: Eye, onClick: (r) => alert(`Viewing ${r.User}`) },
    { label: t("enterprise.audit_logs.edit"), icon: Edit, onClick: (r) => alert(`Editing ${r.User}`) },
    { label: t("enterprise.audit_logs.delete"), icon: Trash2, onClick: (r) => alert(`Deleting ${r.User}`) },
  ];

  const renderActionCell = (row) => <ActionMenuCell row={row} actions={actions} />;

  const handleExportCSV = () => alert(t("enterprise.audit_logs.export_csv"));
  const handleExportPDF = () => alert(t("enterprise.audit_logs.export_pdf"));
  const clearSearch = () => setSearchQuery("");

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <h1 className={`text-xl font-semibold ${theme.text.primary}`}>
        {t("enterprise.audit_logs.title")}
      </h1>

      <div className="flex items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2 pr-8 rounded border ${theme.border.primary} ${theme.background.card} ${theme.text.primary} items-center`}
            >
              <option value="">{t("enterprise.audit_logs.status_filter")}</option>
              <option value="Active">{t("enterprise.audit_logs.active")}</option>
              <option value="De-Activated">{t("enterprise.audit_logs.deactivated")}</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("enterprise.audit_logs.search_placeholder")}
              className={`pl-8 pr-10 py-2 rounded border ${theme.border.primary} ${theme.background.card} ${theme.text.primary} w-full`}
            />

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3">
          <QuickActionButton
            icon={Download}
            label={t("enterprise.audit_logs.export_csv")}
            onClick={handleExportCSV}
          />
          <QuickActionButton
            icon={Download}
            label={t("enterprise.audit_logs.export_pdf")}
            onClick={handleExportPDF}
          />
        </div>
      </div>

      {/* Table Component receives FILTERED data */}
      <TableComponent
        dummyData={filteredData}
        columns={columns}
        renderActionCell={renderActionCell}
        pagination={true}
        showActions={true}
        rowsPerPage={10}
      />
    </div>
  );
}
