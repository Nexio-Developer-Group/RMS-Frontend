/**
 * Permission Utility Functions
 * 
 * This module provides utility functions for checking user permissions throughout the application.
 * Use these functions to determine if a user has the required permissions to access features or perform actions.
 */

/**
 * Check if user has a specific permission
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermission - The permission to check for
 * @returns True if the user has the permission
 * 
 * @example
 * hasPermission(['use_pos', 'place_order'], 'place_order') // returns true
 * hasPermission(['view_menu'], 'place_order') // returns false
 */
export function hasPermission(
    userPermissions: string[],
    requiredPermission: string
): boolean {
    if (!userPermissions || userPermissions.length === 0) {
        return false
    }
    return userPermissions.includes(requiredPermission)
}

/**
 * Check if user has at least one of the required permissions
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermissions - Array of permissions to check for (user needs at least one)
 * @returns True if the user has at least one of the required permissions
 * 
 * @example
 * hasAnyPermission(['place_order', 'view_menu'], ['place_order', 'cancel_order']) // returns true
 * hasAnyPermission(['view_menu'], ['place_order', 'cancel_order']) // returns false
 */
export function hasAnyPermission(
    userPermissions: string[],
    requiredPermissions: string[]
): boolean {
    if (!userPermissions || userPermissions.length === 0) {
        return false
    }
    if (!requiredPermissions || requiredPermissions.length === 0) {
        return true
    }
    return requiredPermissions.some((permission) =>
        userPermissions.includes(permission)
    )
}

/**
 * Check if user has all of the required permissions
 * @param userPermissions - Array of permissions the user has
 * @param requiredPermissions - Array of permissions to check for (user needs all of them)
 * @returns True if the user has all required permissions
 * 
 * @example
 * hasAllPermissions(['place_order', 'cancel_order'], ['place_order', 'cancel_order']) // returns true
 * hasAllPermissions(['place_order'], ['place_order', 'cancel_order']) // returns false
 */
export function hasAllPermissions(
    userPermissions: string[],
    requiredPermissions: string[]
): boolean {
    if (!userPermissions || userPermissions.length === 0) {
        return false
    }
    if (!requiredPermissions || requiredPermissions.length === 0) {
        return true
    }
    return requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
    )
}
