from rest_framework import serializers
from users.models import Clients, LoanOfficer, Loan, AccountUser, Organization
from apps.endpoints.models import BehaviouralScores
from apps.endpoints.models import  RetentionScores
from apps.endpoints.models import  ApplicationScores

class RetentionScoresSerializer(serializers.ModelSerializer):
	class Meta:
		model = RetentionScores
		fields = '__all__'


class ApplicationScoresSerializer(serializers.ModelSerializer):

	
	class Meta:
		model = ApplicationScores
		fields = '__all__'


class BehaviouralScoresSerializer(serializers.ModelSerializer):
	class Meta:
		model = BehaviouralScores
		fields = '__all__'