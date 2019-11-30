from django.contrib import admin
from resume.models import Investments, Classes, Languages
from resume.models import Service, Projects, Education, Experience, Skills
from resume.forms import MonthYearForm
from resume.widgets import MonthYearWidget
from django import forms
from datetime import datetime

class ExperienceForm(forms.ModelForm):
    class Meta:
        model=Experience
        widgets = {
            'start_date': MonthYearWidget(years=range(1997, datetime.now().year + 1)),
            'end_date': MonthYearWidget(years=range(1997, datetime.now().year + 1), required=False),
        }
        fields = "__all__"

class ExperienceClassAdmin(admin.ModelAdmin):
    form = ExperienceForm

admin.site.register(Education)
admin.site.register(Experience, ExperienceClassAdmin)
admin.site.register(Projects)
admin.site.register(Service)
admin.site.register(Skills)

admin.site.register(Investments)
admin.site.register(Classes)
admin.site.register(Languages)