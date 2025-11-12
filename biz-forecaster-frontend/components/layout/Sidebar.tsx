'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tooltip from '@mui/material/Tooltip';

const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { href: '/dashboard/data-entry', label: 'Data Entry', icon: EditNoteIcon },
    { href: '/reports', label: 'Reports', icon: BarChartIcon },
    { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-18 bg-gray-100 dark:bg-gray-900 p-2 flex flex-col items-center space-y-4">
            <div className="text-indigo-600 dark:text-indigo-500 font-bold text-2xl">
                BF
            </div>
            <nav className="flex flex-col items-center space-y-2">
                {menuItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <Tooltip title={label} placement="right" key={href}>
                            <Link
                                href={href}
                                className={`
                  p-3 rounded-lg transition-colors duration-200
                  ${isActive
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }
                `}
                            >
                                <Icon />
                            </Link>
                        </Tooltip>
                    );
                })}
            </nav>
        </aside>
    );
}