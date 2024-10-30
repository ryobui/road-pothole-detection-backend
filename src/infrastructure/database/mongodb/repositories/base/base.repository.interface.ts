import { FindAllResponse } from '@common/types/common.type';
import { FilterQuery, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

export interface BaseRepositoryInterface<T> {
    /**
     * Create a new entity
     * @param dto - The data transfer object containing the entity data
     * @returns The created entity
     */
    create(dto: Partial<T>): Promise<T>;

    /**
     * Find an entity by ID
     * @param id - The unique identifier for the entity
     * @param projection - Fields to include or exclude in the result
     * @returns The found entity or null if not found
     */
    findOneById(id: string, projection?: ProjectionType<T>): Promise<T | null>;

    /**
     * Find a single entity based on a condition
     * @param condition - The condition (filter) to apply (MongoDB filter query)
     * @param projection - Fields to include or exclude in the result
     * @returns The found entity or null if not found
     */
    findOneByCondition(
        condition: FilterQuery<T>,
        projection?: ProjectionType<T>,
    ): Promise<T | null>;

    /**
     * Find all entities that match a condition
     * @param condition - The condition (filter) to apply (MongoDB filter query)
     * @param options - Additional query options such as pagination, sorting, etc.
     * @returns A response containing the entities and metadata like total count
     */
    findAll(condition: FilterQuery<T>, options?: QueryOptions): Promise<FindAllResponse<T>>;

    /**
     * Update an entity by ID
     * @param id - The unique identifier of the entity
     * @param dto - The partial data to update the entity with
     * @returns The updated entity
     */
    update(id: string, dto: UpdateQuery<T>): Promise<T | null>;

    /**
     * Soft delete an entity by ID (marks as deleted but doesn't remove)
     * @param id - The unique identifier of the entity
     * @returns A boolean indicating success or failure
     */
    softDelete(id: string): Promise<boolean>;

    /**
     * Permanently delete an entity by ID (removes from the database)
     * @param id - The unique identifier of the entity
     * @returns A boolean indicating success or failure
     */
    permanentlyDelete(id: string): Promise<boolean>;
}
