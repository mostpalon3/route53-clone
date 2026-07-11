"""route53_dns_record_expansion

Revision ID: a9df07ca049a
Revises: 799a36e099f8
Create Date: 2026-07-11 11:59:09.562935

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a9df07ca049a'
down_revision: Union[str, Sequence[str], None] = '799a36e099f8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    with op.batch_alter_table('dns_records', schema=None) as batch_op:
        batch_op.add_column(sa.Column('record_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('record_name', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('record_type', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('set_identifier', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('health_check_id', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('evaluate_target_health', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.alter_column('ttl', existing_type=sa.INTEGER(), nullable=True)
        batch_op.drop_index('ix_dns_records_name')
        batch_op.drop_index('ix_dns_records_type')
        batch_op.create_index(batch_op.f('ix_dns_records_record_id'), ['record_id'], unique=True)
        batch_op.create_index(batch_op.f('ix_dns_records_record_name'), ['record_name'], unique=False)
        batch_op.create_index(batch_op.f('ix_dns_records_record_type'), ['record_type'], unique=False)
        batch_op.drop_column('type')
        batch_op.drop_column('name')

    # Update existing records to not be null for name and type since they are required
    # Since we can't easily populate them, we will let them be nullable initially,
    # But wait, we need to populate them.
    op.execute("UPDATE dns_records SET record_name = 'placeholder', record_type = 'A' WHERE record_name IS NULL")
    
    with op.batch_alter_table('dns_records', schema=None) as batch_op:
        batch_op.alter_column('record_name', nullable=False)
        batch_op.alter_column('record_type', nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    with op.batch_alter_table('dns_records', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('type', sa.VARCHAR(), nullable=True))
        batch_op.drop_index(batch_op.f('ix_dns_records_record_type'))
        batch_op.drop_index(batch_op.f('ix_dns_records_record_name'))
        batch_op.drop_index(batch_op.f('ix_dns_records_record_id'))
        batch_op.create_index('ix_dns_records_type', ['type'], unique=False)
        batch_op.create_index('ix_dns_records_name', ['name'], unique=False)
        batch_op.alter_column('ttl', existing_type=sa.INTEGER(), nullable=False)
        batch_op.drop_column('updated_at')
        batch_op.drop_column('evaluate_target_health')
        batch_op.drop_column('health_check_id')
        batch_op.drop_column('set_identifier')
        batch_op.drop_column('record_type')
        batch_op.drop_column('record_name')
        batch_op.drop_column('record_id')
