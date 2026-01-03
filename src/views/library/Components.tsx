import { useState, useMemo } from 'react'
import { componentsStore } from '@/views/library/ComponentsStore'
import ComponentsCards from './ComponentsCard'

const Components = () => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')

    const filteredComponents = useMemo(() => {
        return componentsStore.filter((c) => {
            const matchesQuery =
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.tags.toLowerCase().includes(query.toLowerCase())

            return matchesQuery
        })
    }, [category, query])

    return (
        <div className="bg-teal-100 min-h-screen mx-auto p-4">
            <div className="m-4">
                <input
                    type="text"
                    placeholder="Search components..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredComponents.map((c) => (
                        <ComponentsCards key={c.id} {...c} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Components
