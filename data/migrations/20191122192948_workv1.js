
exports.up = function(knex) {
    return (
        knex.schema
            .createTable('project', tbl => {
                tbl.increments()
                tbl.text('name').notNullable()
                tbl.text('description')
                tbl.boolean('complete').notNullable()
            })
            .createTable('resource', tbl => {
                tbl.increments()
                tbl.text('name').unique().notNullable()
                tbl.text('description')
            })
            .createTable('task', tbl => {
                tbl.increments()
                tbl.text('description').notNullable()
                tbl.text('info')
                tbl.boolean('complete').notNullable()
                tbl.integer('project_id')
                    .unsigned()
                    .notNullable()
                    .references('project.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
            .createTable('project_resource', tbl => {
                tbl.increments()
                tbl.integer('project_id')
                    .unsigned()
                    .notNullable()
                    .references('project.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
                tbl.integer('resource_id')
                    .unsigned()
                    .notNullable()
                    .references('resource.id')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
    )

};

exports.down = function(knex) {
    return (
        knex.schema
            .dropTableIfExists('project_resource')
            .dropTableIfExists('task')
            .dropTableIfExists('resource')
            .dropTableIfExists('project')
    )
};
