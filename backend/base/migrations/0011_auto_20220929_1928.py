# Generated by Django 3.2.8 on 2022-09-29 16:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_order_order_det'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('desc', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='cat_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.category'),
        ),
    ]