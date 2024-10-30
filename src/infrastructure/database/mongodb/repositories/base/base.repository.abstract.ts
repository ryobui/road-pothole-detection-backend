import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';
import { BaseRepositoryInterface } from './base.repository.interface';
import { BaseEntity } from '../../entities/base.entity';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
    implements BaseRepositoryInterface<T>
{
    private readonly model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const createdData = await this.model.create(data);
        return createdData.save();
    }

    async findOneById(id: string, projection?: ProjectionType<T>): Promise<T> {
        const item = await this.model.findById(id, projection).exec();
        return item?.deletedAt ? null : item;
    }

    async findOneByCondition(
        condition: FilterQuery<T>,
        projection?: ProjectionType<T>,
    ): Promise<T> {
        return await this.model.findOne({ ...condition, deletedAt: null }, projection).exec();
    }

    async findAll(condition: FilterQuery<T>, options?: QueryOptions): Promise<any> {
        const [items, total] = await Promise.all([
            this.model.find({ ...condition, deletedAt: null }, null, options).exec(),
            this.model.countDocuments({ ...condition, deletedAt: null }).exec(),
        ]);
        return { items, total };
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T> {
        return await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, data, { new: true });
    }

    async softDelete(id: string): Promise<boolean> {
        const deleteItem = await this.findOneById(id);
        if (!deleteItem) return false;

        return !!(await this.update(id, { deletedAt: new Date() }));
    }

    async permanentlyDelete(id: string): Promise<boolean> {
        const deleteItem = await this.model.findById(id);
        if (!deleteItem) return false;

        return !!(await this.model.deleteOne({ _id: id }));
    }
}
