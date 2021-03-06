# Generated by Django 3.2.4 on 2021-08-18 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_auto_20210818_0005'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='last_modified',
            field=models.DateTimeField(auto_now=True, verbose_name='last modified date'),
        ),
        migrations.AddField(
            model_name='post',
            name='last_modified',
            field=models.DateTimeField(auto_now=True, verbose_name='last modified date'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='pulibshed date'),
        ),
        migrations.AlterField(
            model_name='post',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='pulibshed date'),
        ),
    ]
