import React, { useState, useEffect } from "react";

// --- Type Definitions ---

interface Expense {
	id: number;
	description: string;
	amount: number;
	date: string;
}

interface IconProps {
	className?: string;
}

interface SidebarProps {
	isSidebarOpen: boolean;
}

interface MetricCardProps {
	title: string;
	value: number;
	icon: React.ReactNode;
	change?: string;
	isCurrency?: boolean;
}

interface ExpensesTableProps {
	expenses: Expense[];
}

// --- Helper Data ---

const mockExpenses: Expense[] = [
	{
		id: 1,
		description: "Monthly Subscription",
		amount: 15.0,
		date: "2025-06-05",
	},
	{
		id: 2,
		description: "Coffee with team",
		amount: 22.5,
		date: "2025-06-04",
	},
	{ id: 3, description: "New Keyboard", amount: 125.0, date: "2025-06-03" },
	{ id: 4, description: "Lunch", amount: 18.75, date: "2025-06-03" },
	{
		id: 5,
		description: "Cloud Server Bill",
		amount: 55.2,
		date: "2025-06-01",
	},
];

// --- Icon Components (Inline SVG for simplicity) ---

const MenuIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="3" y1="12" x2="21" y2="12"></line>
		<line x1="3" y1="6" x2="21" y2="6"></line>
		<line x1="3" y1="18" x2="21" y2="18"></line>
	</svg>
);

const DollarSignIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="12" y1="1" x2="12" y2="23"></line>
		<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
	</svg>
);

const HashIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="4" y1="9" x2="20" y2="9"></line>
		<line x1="4" y1="15" x2="20" y2="15"></line>
		<line x1="10" y1="3" x2="8" y2="21"></line>
		<line x1="16" y1="3" x2="14" y2="21"></line>
	</svg>
);

const ArrowUpIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="12" y1="19" x2="12" y2="5"></line>
		<polyline points="5 12 12 5 19 12"></polyline>
	</svg>
);

const ArrowDownIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line x1="12" y1="5" x2="12" y2="19"></line>
		<polyline points="19 12 12 19 5 12"></polyline>
	</svg>
);

const DashboardIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="3" y="3" width="7" height="7"></rect>
		<rect x="14" y="3" width="7" height="7"></rect>
		<rect x="14" y="14" width="7" height="7"></rect>
		<rect x="3" y="14" width="7" height="7"></rect>
	</svg>
);

const SettingsIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		className={className}
		stroke="currentColor"
		fill="none"
		strokeWidth="2"
		viewBox="0 0 24 24"
		strokeLinecap="round"
		strokeLinejoin="round"
		height="1em"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="12" cy="12" r="3"></circle>
		<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
	</svg>
);

// --- Main UI Components ---

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
	return (
		<aside
			className={`absolute top-0 left-0 h-screen bg-gray-900 text-gray-300 transition-all duration-300 ease-in-out z-20 ${
				isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
			}`}
		>
			<div className="flex flex-col h-full">
				{/* Logo */}
				<div className="flex items-center justify-center h-20 border-b border-gray-800">
					<DollarSignIcon className="h-8 w-8 text-lime-400" />
					<h1 className="text-xl font-bold ml-2">ExpenseApp</h1>
				</div>

				{/* Navigation */}
				<nav className="flex-grow p-4 space-y-2">
					<a
						href="#"
						className="flex items-center px-4 py-2 text-base font-semibold bg-gray-800 text-lime-400 rounded-lg"
					>
						<DashboardIcon className="h-5 w-5 mr-3" />
						Dashboard
					</a>
					<a
						href="#"
						className="flex items-center px-4 py-2 text-base font-semibold hover:bg-gray-800 rounded-lg"
					>
						<SettingsIcon className="h-5 w-5 mr-3" />
						Settings
					</a>
				</nav>

				{/* User Profile */}
				<div className="p-4 border-t border-gray-800">
					<div className="flex items-center">
						<img
							className="h-10 w-10 rounded-full object-cover"
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
							alt="John Doe profile picture"
							onError={(e) => {
								(e.target as HTMLImageElement).onerror = null;
								(e.target as HTMLImageElement).src =
									"https://placehold.co/80x80/1a202c/32CD32?text=JD";
							}}
						/>
						<div className="ml-3">
							<p className="text-sm font-semibold text-white">
								John Doe
							</p>
							<p className="text-xs text-gray-400">
								View profile
							</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon,
	change,
	isCurrency = true,
}) => {
	const formattedValue = isCurrency ? `$${Number(value).toFixed(2)}` : value;
	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-md">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-gray-400">{title}</p>
				{icon}
			</div>
			<div className="mt-4">
				<p className="text-3xl font-bold text-white">
					{formattedValue}
				</p>
				{change && (
					<p
						className={`text-xs mt-1 ${
							change.startsWith("+")
								? "text-lime-400"
								: "text-red-400"
						}`}
					>
						{change} vs last month
					</p>
				)}
			</div>
		</div>
	);
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
			<h2 className="text-xl font-semibold text-white mb-4">
				Recent Expenses
			</h2>
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="border-b border-gray-700 text-sm text-gray-400">
							<th className="py-3 px-4 font-medium">
								Description
							</th>
							<th className="py-3 px-4 font-medium">Date</th>
							<th className="py-3 px-4 font-medium text-right">
								Amount
							</th>
						</tr>
					</thead>
					<tbody>
						{expenses.length > 0 ? (
							expenses.map((expense) => (
								<tr
									key={expense.id}
									className="border-b border-gray-700 hover:bg-gray-700/50"
								>
									<td className="py-4 px-4 text-white">
										{expense.description}
									</td>
									<td className="py-4 px-4 text-gray-300">
										{expense.date}
									</td>
									<td className="py-4 px-4 text-white font-mono text-right">
										${expense.amount.toFixed(2)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={3}
									className="text-center py-8 text-gray-500"
								>
									No expenses recorded yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

// --- App Component ---

const App: React.FC = () => {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
	const [expenses, setExpenses] = useState<Expense[]>([]);

	// TODO: replace this with a real API call.
	useEffect(() => {
		// Simulating a fetch call
		setExpenses(mockExpenses);
	}, []);

	const totalExpenses = expenses.reduce(
		(sum, expense) => sum + expense.amount,
		0
	);
	const highestExpense = Math.max(0, ...expenses.map((e) => e.amount));
	const lowestExpense = Math.min(Infinity, ...expenses.map((e) => e.amount));

	return (
		<div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
			<Sidebar isSidebarOpen={isSidebarOpen} />

			<main
				className={`transition-all duration-300 ease-in-out ${
					isSidebarOpen ? "pl-64" : "pl-0"
				}`}
			>
				<div className="p-6 md:p-8">
					{/* Header */}
					<header className="flex items-center justify-between mb-8">
						<div className="flex items-center">
							<button
								onClick={() => setSidebarOpen(!isSidebarOpen)}
								className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400 mr-4"
							>
								<MenuIcon className="h-6 w-6" />
							</button>
							<h1 className="text-3xl font-bold text-white">
								Dashboard
							</h1>
						</div>
						{/* The "Add Expense" button will be added here by the candidate */}
					</header>

					{/* Metric Widgets */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<MetricCard
							title="Total Expenses"
							value={totalExpenses}
							icon={
								<DollarSignIcon className="h-6 w-6 text-lime-400" />
							}
							change="+5.2%"
						/>
						<MetricCard
							title="Total Transactions"
							value={expenses.length}
							icon={
								<HashIcon className="h-6 w-6 text-lime-400" />
							}
							isCurrency={false}
							change="-1.0%"
						/>
						<MetricCard
							title="Highest Expense"
							value={highestExpense}
							icon={
								<ArrowUpIcon className="h-6 w-6 text-lime-400" />
							}
						/>
						<MetricCard
							title="Lowest Expense"
							value={isFinite(lowestExpense) ? lowestExpense : 0}
							icon={
								<ArrowDownIcon className="h-6 w-6 text-lime-400" />
							}
						/>
					</div>

					{/* Expenses Table */}
					<ExpensesTable expenses={expenses} />
				</div>
			</main>
		</div>
	);
};

export default App;
