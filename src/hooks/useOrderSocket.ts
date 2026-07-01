import { useEffect, useRef, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import appConfig from '@/configs/app.config'

export type OrderSocketEvent =
    | { type: 'order:new'; payload: { order_id: string; order_number: string; table_id: string; items: unknown[] } }
    | { type: 'order:status:updated'; payload: { order_id: string; status: string; updated_at: string } }
    | { type: 'order:item:ready'; payload: { order_id: string; item_id: string; item_name: string } }
    | { type: 'order:ready'; payload: { order_id: string; order_number: string } }

export function useOrderSocket(onEvent?: (event: OrderSocketEvent) => void) {
    const queryClient = useQueryClient()
    const socketRef = useRef<unknown>(null)
    const onEventRef = useRef(onEvent)
    onEventRef.current = onEvent

    useEffect(() => {
        // Retrieve token using same strategy as AxiosRequestIntrceptorConfigCallback
        const storage = appConfig.accessTokenPersistStrategy
        let token = ''
        if (storage === 'localStorage') {
            token = localStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
        } else if (storage === 'sessionStorage') {
            token = sessionStorage.getItem(TOKEN_NAME_IN_STORAGE) || ''
        } else if (storage === 'cookies') {
            token = Cookies.get(TOKEN_NAME_IN_STORAGE) || ''
        }

        // Derive WebSocket base URL from the API prefix (strip /api suffix if present)
        const apiPrefix = appConfig.apiPrefix || 'http://localhost:3000'
        const wsBase = apiPrefix.replace(/\/api$/, '')

        import('socket.io-client')
            .then(({ io }) => {
                const socket = io(wsBase, {
                    auth: { token },
                    transports: ['websocket'],
                    reconnection: true,
                    reconnectionDelay: 2000,
                })

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                socketRef.current = socket as any

                socket.on('connect', () => {
                    console.log('[WS] Connected to order gateway')
                })

                socket.on('disconnect', () => {
                    console.log('[WS] Disconnected from order gateway')
                })

                const handleOrderEvent = (type: OrderSocketEvent['type'], payload: unknown) => {
                    queryClient.invalidateQueries({ queryKey: ['orders'] })
                    queryClient.invalidateQueries({ queryKey: ['order-stats'] })
                    onEventRef.current?.({ type, payload } as OrderSocketEvent)
                }

                socket.on('order:new', (payload: unknown) => handleOrderEvent('order:new', payload))
                socket.on('order:status:updated', (payload: unknown) =>
                    handleOrderEvent('order:status:updated', payload),
                )
                socket.on('order:item:ready', (payload: unknown) =>
                    handleOrderEvent('order:item:ready', payload),
                )
                socket.on('order:ready', (payload: unknown) => handleOrderEvent('order:ready', payload))
            })
            .catch(() => {
                console.warn('[WS] socket.io-client not available — real-time updates disabled')
            })

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(socketRef.current as any)?.disconnect?.()
        }
    }, [queryClient])

    const disconnect = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(socketRef.current as any)?.disconnect?.()
    }, [])

    return { disconnect }
}
