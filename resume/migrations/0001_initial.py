# Generated by Django 2.1.15 on 2020-12-11 05:31

from django.db import migrations, models
import django.db.models.deletion
import resume.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Certifications',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140)),
                ('vendor', models.CharField(max_length=60)),
                ('acquired', models.DateField(validators=[resume.models.date_validator_past_only], verbose_name='Acquisiton Date of the Certificate')),
                ('expire', models.DateField(validators=[resume.models.date_validator_future_only], verbose_name='Expiration Date of the Certificate')),
                ('certificate', models.ImageField(upload_to='')),
                ('icon', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=5)),
                ('course_number', models.CharField(max_length=5)),
                ('course_name', models.CharField(max_length=140)),
                ('credit_hours', models.CharField(max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('university', models.CharField(max_length=140, verbose_name='Name of University')),
                ('college', models.CharField(max_length=140, verbose_name='College')),
                ('degree', models.CharField(max_length=140, verbose_name='Type of Degree')),
                ('major', models.CharField(max_length=140, verbose_name='Major')),
                ('year', models.CharField(max_length=4, verbose_name='Year')),
                ('gpa', models.DecimalField(decimal_places=2, default=4.0, max_digits=4, verbose_name='GPA')),
                ('banner', models.FileField(default='IMAGE URL', upload_to='', verbose_name='Banner Image')),
                ('logo', models.FileField(default='IMAGE URL', upload_to='', verbose_name='Logo')),
                ('mascot', models.FileField(default='IMAGE URL', upload_to='', verbose_name='Mascot Image')),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=140, verbose_name='Company Name')),
                ('role', models.CharField(max_length=140)),
                ('start_date', models.DateField(verbose_name='Start Date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='End Date')),
                ('current', models.BooleanField(default=False, verbose_name='Current Role?')),
                ('long_description', models.TextField(blank=True, null=True, verbose_name='Long Description')),
                ('banner', models.ImageField(upload_to='', verbose_name='Banner Image')),
                ('tile', models.ImageField(upload_to='', verbose_name='Tile Image')),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('industry', models.CharField(max_length=140)),
                ('role', models.CharField(max_length=140)),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Start Date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='End Date')),
                ('long_description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Skills',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(max_length=40)),
                ('frameworks', models.TextField()),
                ('logo', models.FileField(upload_to='', verbose_name='Language Logo')),
                ('hover_animation', models.CharField(blank=True, choices=[('back', 'Back'), ('forward', 'Forward'), ('down', 'Down'), ('up', 'Down'), ('spin', 'Spin'), ('drop', 'Drop'), ('fade', 'Fade'), ('float-away', 'Float Away'), ('sink-away', 'Sink Away'), ('grow', 'Grow'), ('shrink', 'Shrink'), ('pulse', 'Pulse'), ('pulse-grow', 'Pulse Grow'), ('pulse-shrink', 'Pulse Shrink'), ('push', 'Push'), ('pop', 'Pop'), ('bounce', 'Bounce'), ('rotate', 'Rotate'), ('grow-rotate', 'Grow Rotate'), ('float', 'Float'), ('sink', 'Sink'), ('bob', 'Bob'), ('hang', 'Hang'), ('wobble-horizontal', 'Wobble Horizontal'), ('wobble-vertical', 'Wobble Vertical'), ('buzz', 'Buzz'), ('buzz-out', 'Buzz Out')], max_length=40, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='projects',
            name='skills',
            field=models.ManyToManyField(to='resume.Skills'),
        ),
        migrations.AddField(
            model_name='classes',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='resume.Education'),
        ),
    ]
