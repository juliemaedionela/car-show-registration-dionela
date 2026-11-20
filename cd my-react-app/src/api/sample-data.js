let mockDb = [
  {
    id: 1,
    ownerName: "Carlos Mendoza",
    carModel: "1998 Nissan Skyline GT-R",
    category: "JDM",
    entryFee: 1500,
    amountPaid: 1500,
    paymentStatus: "Paid", // "Unpaid" | "Partial" | "Paid"
    status: "CheckedIn",   // "Pending" | "Confirmed" | "CheckedIn" | "Cancelled"
  },
  {
    id: 2,
    ownerName: "Bea Alonzo",
    carModel: "2023 Ford Mustang GT",
    category: "Muscle",
    entryFee: 2000,
    amountPaid: 1000,
    paymentStatus: "Partial",
    status: "Confirmed",
  },
  {
    id: 3,
    ownerName: "Miguel Tan",
    carModel: "1992 Honda Civic EG6",
    category: "JDM",
    entryFee: 1500,
    amountPaid: 0,
    paymentStatus: "Unpaid",
    status: "Pending",
  },
];

export async function fetchRegistrations({ search = "", status = "All", page = 1, pageSize = 5 }) {
  await new Promise((r) => setTimeout(r, 200)); // Simulate network delay

  const filtered = mockDb.filter((item) => {
    const matchesSearch =
      item.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      item.carModel.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || item.status === status;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs from all non-cancelled entries
  const kpis = {
    totalRegistration: mockDb.filter((r) => r.status !== "Cancelled").length,
    totalPayments: mockDb.reduce((sum, r) => sum + r.amountPaid, 0),
    uncollectedPayments: mockDb
      .filter((r) => r.status !== "Cancelled")
      .reduce((sum, r) => sum + (r.entryFee - r.amountPaid), 0),
    confirmed: mockDb.filter((r) => r.status === "Confirmed" || r.status === "CheckedIn").length,
    checkedIn: mockDb.filter((r) => r.status === "CheckedIn").length,
  };

  const start = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(start, start + pageSize);

  return {
    items: paginatedItems,
    totalCount: filtered.length,
    kpis,
  };
}

export async function createRegistration(newEntry) {
  await new Promise((r) => setTimeout(r, 200));
  const record = { id: Date.now(), ...newEntry };
  mockDb = [record, ...mockDb];
  return record;
}
