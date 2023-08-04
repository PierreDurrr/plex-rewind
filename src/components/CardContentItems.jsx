import CardContentItem from './CardContentItem'

export default async function CardContentItems({ items, type, serverId }) {
  return (
    <ul className='grid mt-4 overflow-hidden xl:grid-flow-col xl:grid-cols-2 xl:grid-rows-3 sm:mt-6 xl:gap-x-8 gap-y-3 sm:gap-y-5'>
      {items.map((itemData, i) => (
        <CardContentItem
          data={itemData}
          i={i}
          key={i}
          type={type}
          serverId={serverId}
        />
      ))}
    </ul>
  )
}
