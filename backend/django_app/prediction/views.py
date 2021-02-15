from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
import pandas as pd
from apps.ml.income_classifier.random_forest import RandomForestClassifier

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from apps.ml.application_classifier.scoring_model import LoanApplicationScoring
from prediction.application_scoring_processing import compute_prediction as app_scoring
from prediction.behavioral_scoring_processing import compute_prediction as behavioral_scoring
from prediction.retention_scoring_processing import compute_prediction as retention_scoring
from prediction.serializers import *
# Create your views here.
# Class based view to predict based on IRIS model
class IRIS_Model_Predict(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        X = pd.Series(values).to_numpy().reshape(1, -1)
        loaded_mlmodel = PredictionConfig.irismlmodel
        y_pred = loaded_mlmodel.predict(X)
        y_pred = pd.Series(y_pred)
        target_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
        y_pred = y_pred.map(target_map).to_numpy()
        response_dict = {"Prediced Iris Species": y_pred[0]}
        print(response_dict)
        return Response(response_dict, status=200)

class LoanApplicationScoringView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        print(data)
        score = app_scoring(request)
        print(score)
        return Response(score, status=200)

    def get(self, request):
        global qry
        queryList = ApplicationScores.objects.all()
        loan_officer = self.request.query_params.get('loan_officer', None)
        sort_by = self.request.query_params.get('sort_by', None)

        if loan_officer:
            queryList = ApplicationScores.objects.filter(loan_officer = loan_officer)[:5]
  
        # sort it if applied on based on price/points
        if sort_by == "income":
            queryList = queryList.order_by("client_id")
        elif sort_by == "credit_amount":
            queryList = queryList.order_by("loan_amount")

        # get predictions for applications scoring predictions
        data = ApplicationScoresSerializer(queryList, many=True).data
        return Response(data, status=200)

        

class BehavioralScoringView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        print(data)
        score, post_prediction = behavioral_scoring(request)
        print(post_prediction)
        return Response(post_prediction, status=200)


    def get(self, request):
        serializer_class = BehaviouralScoresSerializer
        # filter the queryset based on the filters applied
        global qry
        queryList = BehaviouralScores.objects.all()
        loan_officer = self.request.query_params.get('loan_officer', None)
        sort_by = self.request.query_params.get('sort_by', None)

        if loan_officer:
            queryList = BehaviouralScores.objects.filter(loan_officer = loan_officer)[:5]
  
        # sort it if applied on based on price/points
        if sort_by == "income":
            queryList = queryList.order_by("client_id")
        elif sort_by == "credit_amount":
            queryList = queryList.order_by("loan_amount")
        data = BehaviouralScoresSerializer(queryList, many=True).data
        data = {"behavioural_data":data}
        return Response(data, status=200) 

class RetentionScoringView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        print(data)
        algorithm_object = RandomForestClassifier()
        # print("PREDICTIOON OBJECT",algorithm_object)
        prediction = algorithm_object.compute_prediction(request.data)
        # score = retention_scoring(request.data)
        post_processing = retention_scoring(prediction)
        print(post_processing)
        return Response(post_processing, status=200)

    def get(self, request):
        serializer_class = RetentionScoresSerializer
        # filter the queryset based on the filters applied
        global qry
        queryList = RetentionScores.objects.all()
        loan_officer = self.request.query_params.get('loan_officer', None)
        sort_by = self.request.query_params.get('sort_by', None)

        if loan_officer:
            queryList = RetentionScores.objects.filter(loan_officer = loan_officer)[:5]
  
        # sort it if applied on based on price/points
        if sort_by == "income":
            queryList = queryList.order_by("client_id")
        elif sort_by == "credit_amount":
            queryList = queryList.order_by("loan_amount")
        # get predictions for applications scoring predictions
        data = RetentionScoresSerializer(queryList, many=True).data
        data = {"retention_data":data}
        return  Response(data,status=200)