import { useClient, type DocumentActionComponent } from 'sanity'

export const postPublishAction = (originalAction: DocumentActionComponent): DocumentActionComponent => {
  return (props) => {
    const client = useClient({ apiVersion: '2025-01-01' })
    const action = originalAction(props)

    if (!action) return null

    return {
      ...action,
      onHandle: async () => {
        if (!props.published) {
          await client.patch(`drafts.${props.id}`).set({ status: 'published' }).commit()
        }

        await action.onHandle?.()
      }
    }
  }
}