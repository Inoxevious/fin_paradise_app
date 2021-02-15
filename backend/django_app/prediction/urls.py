from django.urls import path
import prediction.views as views
urlpatterns = [
    path('predict/', views.IRIS_Model_Predict.as_view(), name = 'api_predict'),
    path('app_scoring/', views.LoanApplicationScoringView.as_view(), name = 'api_predict_app_scoring'),
    path('behavioral_scoring/', views.BehavioralScoringView.as_view(), name = 'api_predict_behavioral_scoring'),
    path('retention_scoring/', views.RetentionScoringView.as_view(), name = 'api_predict_retention_scoring'),
]