# Generated by Django 3.2.12 on 2022-04-13 22:41

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(0, 'New'), (1, 'In Process'), (2, 'Done')], default=0)),
                ('amount', models.BigIntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('in_cart', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Order',
                'verbose_name_plural': 'Orders',
                'db_table': 'orders',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('photo', models.ImageField(upload_to='products')),
                ('description', models.CharField(blank=True, default=None, max_length=5000, null=True)),
                ('price', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'db_table': 'products',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patronymic', models.CharField(blank=True, default=None, max_length=256, null=True)),
                ('balance', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Profile',
                'verbose_name_plural': 'Profiles',
                'db_table': 'profiles',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(choices=[(1, 'Buying'), (2, 'Deposit'), (3, 'Coin Gifting')], default=1)),
                ('accrual', models.IntegerField(default=0)),
                ('description', models.CharField(blank=True, default=None, max_length=2048, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('destination', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='transactions_to_me', to='api.profile')),
                ('order', models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, to='api.order')),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.profile')),
            ],
            options={
                'verbose_name': 'Transaction',
                'verbose_name_plural': 'Transactions',
                'db_table': 'transactions',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='TransactionFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.FileField(upload_to='transaction_files')),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='files', to='api.transaction')),
            ],
            options={
                'verbose_name': 'Transaction File',
                'verbose_name_plural': 'Transaction Files',
                'db_table': 'transaction_files',
            },
        ),
        migrations.CreateModel(
            name='StorageCell',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.IntegerField(choices=[(1, 'Xs'), (2, 'S'), (3, 'M'), (4, 'L'), (5, 'Xl'), (6, 'Xxl'), (7, 'Xxxl')], default=3)),
                ('amount', models.BigIntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cells_in_storage', to='api.product')),
            ],
            options={
                'verbose_name': 'Storage Cell',
                'verbose_name_plural': 'Storage Cells',
                'db_table': 'storage_cells',
                'unique_together': {('product', 'size')},
            },
        ),
        migrations.AddField(
            model_name='order',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.profile'),
        ),
        migrations.AddField(
            model_name='order',
            name='storage_cell',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='related_orders', to='api.storagecell'),
        ),
    ]
