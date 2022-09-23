interface PageTab {
    key: string
    title: string
}

interface PageTabsProps {
    options: PageTab[]
    activeKey: string
    onSwitch: (tab: PageTab) => void
}

const PageTabs = ({ activeKey, onSwitch, options }: PageTabsProps) => {
    return (
        <div className="mb-6 flex flex-row gap-3">
            {options.map((opt) => (
                <div
                    className={`flex-1 rounded py-3 ${
                        opt.key === activeKey
                            ? "cursor-default bg-blue-200 bg-opacity-60 font-bold drop-shadow-xl dark:bg-slate-600"
                            : "cursor-pointer text-black dark:text-white"
                    }`}
                    onClick={() => onSwitch(opt)}
                >
                    {opt.title}
                </div>
            ))}
        </div>
    )
}

export default PageTabs
