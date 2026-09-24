import React, { useState } from "react";
import { 
  UserProfile, 
  Job, 
  Vehicle, 
  AppLanguage,
  TruckDetails
} from "../types";
import { 
  Truck, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  Navigation, 
  Zap, 
  Building2, 
  Briefcase, 
  Clock, 
  Check, 
  AlertCircle,
  Sparkles,
  Layers,
  Settings,
  X,
  Radio
} from "lucide-react";
import { translations } from "../data/translations";

interface TruckOwnerDashboardProps {
  user: UserProfile;
  jobs: Job[];
  vehicles: Vehicle[];
  language: AppLanguage;
  onAddTruck?: (truck: TruckDetails) => void;
  onOpenWallet?: () => void;
  onOpenProfile?: () => void;
}

export const TruckOwnerDashboard: React.FC<TruckOwnerDashboardProps> = ({
  user,
  jobs,
  vehicles,
  language,
  onAddTruck,
  onOpenWallet,
  onOpenProfile,
}) => {
  const t = translations[language];
  // Initial truck from user profile or fallback default
  const defaultTruck: TruckDetails = user.truckDetails || {
    truckType: "Tata Ace / Chota Hathi (1 Ton)",
    brandModel: "Tata Motors Ace Gold High-Deck",
    manufacturingDate: "2023",
    registrationNumber: "DL-01-AB-1234",
    registrationDetails: "Commercial Yellow Plate • RC Fitness Active",
    loadCapacity: "1.0 Ton (1000 kg)",
    availability: "Immediate / Daily On-Demand",
    location: user.city ? `${user.city} Logistics Hub` : "Okhla Logistics Park, New Delhi",
  };

  const [trucksList, setTrucksList] = useState<TruckDetails[]>([defaultTruck]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"fleet" | "contracts" | "earnings">("fleet");

  // Add Truck Form State
  const [newTruckType, setNewTruckType] = useState<string>("Tata Ace / Chota Hathi (1 Ton)");
  const [newBrandModel, setNewBrandModel] = useState<string>("Tata Motors Ace Gold");
  const [newMfgYear, setNewMfgYear] = useState<string>("2023");
  const [newPlateNumber, setNewPlateNumber] = useState<string>("DL-01-TX-9988");
  const [newRegDetails, setNewRegDetails] = useState<string>("Commercial Yellow Plate • Fitness Valid 2028");
  const [newLoadCapacity, setNewLoadCapacity] = useState<string>("1.0 Ton (1000 kg)");
  const [newAvailability, setNewAvailability] = useState<string>("Immediate / Daily On-Demand");
  const [newLocation, setNewLocation] = useState<string>(user.city || "Delhi NCR Logistics Park");

  // Contract accepted notifications
  const [acceptedContracts, setAcceptedContracts] = useState<string[]>([]);

  // TRUCK OWNER WORK OPPORTUNITIES & B2B FREIGHT CONTRACTS
  const truckContracts = [
    {
      id: "contract-1",
      title: "Daily FMCG Bulk Depot-to-Store Distribution",
      client: "Reliance Retail & JioMart Logistics",
      route: "Okhla Warehouse ➔ South Delhi & Noida Hubs",
      payLabel: "₹4,200 per trip (₹1,05,000 / month)",
      payoutAmount: 4200,
      tonnage: "1.0 to 2.5 Ton Capacity",
      timing: "Morning Shift (6:00 AM - 2:00 PM)",
      tripsPerDay: "2 Trips Daily Guaranteed",
      contractDuration: "6 Months Assured Contract",
      perks: ["Fuel Advance Provided", "Fast Loading Dock Priority", "Instant Weekly Settlement"],
    },
    {
      id: "contract-2",
      title: "Mid-Mile Heavy Cargo & Parcel Logistics Hub Linehaul",
      client: "Delhivery Express Freight Hub",
      route: "Sanjay Gandhi Transport Nagar ➔ Gurugram Gateway",
      payLabel: "₹5,500 per trip + Toll Reimbursed",
      payoutAmount: 5500,
      tonnage: "1.5 to 3.5 Ton Container",
      timing: "Night Route (9:00 PM - 5:00 AM)",
      tripsPerDay: "1 Long Haul Night Run",
      contractDuration: "12 Months Renewable",
      perks: ["FASTag Toll Direct Reimbursement", "Dedicated Route Coordinator", "₹10,000 Fleet Loyalty Bonus"],
    },
    {
      id: "contract-3",
      title: "Industrial Goods & Hardware Wholesale Transit",
      client: "Tata Steel & JSW Distribution Partner",
      route: "Mayapuri Industrial Area ➔ Faridabad Logistics Cluster",
      payLabel: "₹6,800 per trip",
      payoutAmount: 6800,
      tonnage: "2.0 to 5.0 Ton Heavy Vehicle",
      timing: "Flexible Day Loading (9:00 AM - 6:00 PM)",
      tripsPerDay: "On-Demand Daily Dispatch",
      contractDuration: "Monthly On-Call Agreement",
      perks: ["Zero Waiting Time Surcharge", "Free Driver Helper Provided", "Direct Bank RTGS"],
    },
    {
      id: "contract-4",
      title: "Cold Chain & Fresh Dairy Morning Supply Fleet",
      client: "Mother Dairy & Amul Supply Chain",
      route: "Patparganj Central Dairy ➔ East Delhi Outlets",
      payLabel: "₹3,800 per trip (₹95,000 / month)",
      payoutAmount: 3800,
      tonnage: "1.0 to 1.5 Ton Insulated/Open Deck",
      timing: "Early Morning (4:30 AM - 10:30 AM)",
      tripsPerDay: "Daily Fixed Morning Schedule",
      contractDuration: "1 Year Standard Contract",
      perks: ["Early Hours Easy Traffic", "Clean Cargo Only", "₹5,000 Punctuality Incentive"],
    },
  ];

  const handleAddNewTruckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdTruck: TruckDetails = {
      truckType: newTruckType,
      brandModel: newBrandModel,
      manufacturingDate: newMfgYear,
      registrationNumber: newPlateNumber.toUpperCase(),
      registrationDetails: newRegDetails,
      loadCapacity: newLoadCapacity,
      availability: newAvailability,
      location: newLocation,
    };

    setTrucksList((prev) => [createdTruck, ...prev]);
    if (onAddTruck) {
      onAddTruck(createdTruck);
    }
    setShowAddModal(false);
  };

  const handleAcceptContract = (contractId: string) => {
    setAcceptedContracts((prev) => [...prev, contractId]);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200 pb-12">
      {/* 1. TRUCK OWNER OVERVIEW BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-2xl p-4 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 shrink-0 shadow-inner">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white">{user.name}</span>
                <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {t.verifiedOwner}
                </span>
              </div>
              <p className="text-xs text-indigo-200/90 font-medium mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                <span>{defaultTruck.location || user.city}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-950 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Truck</span>
          </button>
        </div>

        {/* Quick Fleet & Revenue Stats */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/90 grid grid-cols-3 gap-2 text-[11px] bg-slate-950/60 rounded-xl p-2.5 border border-slate-800 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Fleet Size</span>
            <span className="font-bold text-white text-xs">{trucksList.length} Vehicle(s)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Monthly Revenue</span>
            <span className="font-bold text-emerald-400 text-xs">₹1,28,500</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Fleet GPS Live</span>
            <span className="font-bold text-indigo-300 text-xs flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS: MY FLEET | LOAD CONTRACTS | EARNINGS */}
      <div className="bg-slate-900 p-1 rounded-2xl border border-slate-800 grid grid-cols-3 text-xs shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab("fleet")}
          className={`py-2 rounded-xl font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "fleet"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>My Trucks ({trucksList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contracts")}
          className={`py-2 rounded-xl font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "contracts"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Load Contracts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("earnings")}
          className={`py-2 rounded-xl font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "earnings"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Earnings & Payouts</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      {activeTab === "fleet" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
              Attached Trucks & Vehicle Inventory
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Attach New Vehicle</span>
            </button>
          </div>

          {trucksList.map((truck, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-300 shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-300 bg-indigo-950/90 px-2 py-0.5 rounded border border-indigo-800/80 inline-block mb-1">
                      {truck.truckType}
                    </span>
                    <h4 className="text-xs font-black text-white">{truck.brandModel}</h4>
                    <p className="font-mono text-[11px] text-emerald-400 font-bold tracking-wider">
                      {truck.registrationNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                    <span>Live GPS Active</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Mfg: {truck.manufacturingDate}
                  </span>
                </div>
              </div>

              {/* Truck specifications & load details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block">Payload Capacity:</span>
                  <span className="font-bold text-slate-200">{truck.loadCapacity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Availability:</span>
                  <span className="font-bold text-indigo-300">{truck.availability}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 block">Current Location:</span>
                  <span className="font-bold text-slate-200 truncate block">{truck.location}</span>
                </div>
              </div>

              {truck.registrationDetails && (
                <div className="text-[10px] text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{truck.registrationDetails}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("contracts")}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Assign to Freight Load</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "contracts" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">
              B2B Freight Loads & Truck Work Opportunities
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {truckContracts.length} Contracts Available
            </span>
          </div>

          {truckContracts.map((contract) => {
            const isAccepted = acceptedContracts.includes(contract.id);

            return (
              <div
                key={contract.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-black uppercase text-indigo-300 bg-indigo-950/90 px-2 py-0.5 rounded border border-indigo-800/80 inline-block mb-1">
                      {contract.tonnage}
                    </span>
                    <h4 className="text-xs font-black text-white">{contract.title}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold">{contract.client}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-emerald-400 block">
                      {contract.payLabel}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {contract.tripsPerDay}
                    </span>
                  </div>
                </div>

                {/* Route and schedule */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Navigation className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{contract.route}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{contract.timing}</span>
                  </div>
                </div>

                {/* Perks */}
                <div className="flex flex-wrap gap-1">
                  {contract.perks.map((perk, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60 flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{perk}</span>
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-1 border-t border-slate-800">
                  {isAccepted ? (
                    <div className="w-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Contract Allocated to {trucksList[0].registrationNumber}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAcceptContract(contract.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Accept Freight Contract for My Truck</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "earnings" && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
            <h3 className="text-xs font-black text-slate-200">Owner Revenue & Payout Ledger</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-medium">This Month Gross</span>
                <span className="text-base font-black text-emerald-400">₹1,28,500</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-medium">Net Payout Transferred</span>
                <span className="text-base font-black text-white">₹1,12,400</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1 text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span>Completed Trips</span>
                <span className="font-bold text-white">42 Trips</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span>Average Earnings Per Trip</span>
                <span className="font-bold text-emerald-400">₹3,059</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Active Bank Settlement</span>
                <span className="font-mono font-bold text-slate-200">HDFC •••• 9102</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: ADD / ATTACH NEW TRUCK */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl relative my-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Attach / List New Truck</h3>
                  <p className="text-[10px] text-slate-400">Register vehicle for B2B loads & contracts</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewTruckSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Truck Category / Type
                </label>
                <select
                  value={newTruckType}
                  onChange={(e) => setNewTruckType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Tata Ace / Chota Hathi (1 Ton)">Tata Ace / Chota Hathi (1 Ton)</option>
                  <option value="Mahindra Bolero Pickup (1.5 Ton)">Mahindra Bolero Pickup (1.5 Ton)</option>
                  <option value="Ashok Leyland Dost / Bada Dost (2 Ton)">Ashok Leyland Dost / Bada Dost (2 Ton)</option>
                  <option value="Euler HiLoad EV 3-Wheeler Cargo">Euler HiLoad EV 3-Wheeler Cargo</option>
                  <option value="14ft - 19ft Closed Container Truck">14ft - 19ft Closed Container Truck</option>
                  <option value="Multi-Axle Heavy Commercial Truck (10+ Ton)">Multi-Axle Heavy Commercial Truck (10+ Ton)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Brand & Model
                  </label>
                  <input
                    type="text"
                    value={newBrandModel}
                    onChange={(e) => setNewBrandModel(e.target.value)}
                    placeholder="e.g. Tata Motors Ace Gold"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Mfg Year / Date
                  </label>
                  <input
                    type="text"
                    value={newMfgYear}
                    onChange={(e) => setNewMfgYear(e.target.value)}
                    placeholder="e.g. 2023"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Registration Plate Number
                  </label>
                  <input
                    type="text"
                    value={newPlateNumber}
                    onChange={(e) => setNewPlateNumber(e.target.value)}
                    placeholder="e.g. DL-01-TX-9988"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Load Capacity
                  </label>
                  <input
                    type="text"
                    value={newLoadCapacity}
                    onChange={(e) => setNewLoadCapacity(e.target.value)}
                    placeholder="e.g. 1.0 Ton (1000 kg)"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Registration Details / RC Fitness
                </label>
                <input
                  type="text"
                  value={newRegDetails}
                  onChange={(e) => setNewRegDetails(e.target.value)}
                  placeholder="e.g. Commercial Yellow Plate • RC Fitness Active"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Availability Mode
                  </label>
                  <select
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Immediate / Daily On-Demand">Immediate / Daily On-Demand</option>
                    <option value="Monthly Dedicated Contract">Monthly Dedicated Contract</option>
                    <option value="Part-Time Night Shifts">Part-Time Night Shifts</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Vehicle Base Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Okhla Logistics Park"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Attach Truck & Start Earning</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
